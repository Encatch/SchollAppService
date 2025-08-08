const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Class = require('../models/Class');
const Section = require('../models/Section');

const createStudent = async (data) => {
  try {
    // Generate username from first and last name
    const firstName = data.first_name.trim().toLowerCase();
    const lastName = data.last_name.trim().toLowerCase();
    let username = `${firstName}_${lastName}`;

    // Ensure username is unique
    let count = 1;
    let uniqueUsername = username;
    while (await prisma.student.findUnique({ where: { username: uniqueUsername } })) {
      uniqueUsername = `${username}${count}`;
      count++;
    }
    username = uniqueUsername;

    // Validate class and section IDs
    if (!data.class?.id || isNaN(Number(data.class.id))) {
      return { status: 'fail', message: 'class.id is required and must be a valid number' };
    }
    if (!data.section?.id || isNaN(Number(data.section.id))) {
      return { status: 'fail', message: 'section.id is required and must be a valid number' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Create student with nested feeDetails and terms
    const student = await prisma.student.create({
      data: {
        username, // use generated username
        password: hashedPassword,
        firstName: data.first_name,
        lastName: data.last_name,
        gender: { connect: { id: Number(data.gender.id) } },
        fatherName: data.father_name,
        motherName: data.mother_name,
        fatherOccupation: data.father_occupation?.id || data.father_occupation, // always save as string
        motherOccupation: data.mother_occupation?.id || data.mother_occupation, // always save as string
        mobileNumber: data.mobile_number,
        motherMobileNumber: data.mother_mobile_number,
        fatherEmail: data.father_email,
        address: data.address,
        isTransportRequired: data.is_transport_required,
        class: { connect: { id: Number(data.class.id) } },
        section: { connect: { id: Number(data.section.id) } },
        feeDetails: {
          create: {
            totalFee: data.fee_details.total_fee,
            discountAmount: data.fee_details.discount_amount,
            totalTerms: data.fee_details.total_terms,
            remainingAmount: data.fee_details.remaining_amount,
            terms: {
              create: Array.isArray(data.terms) ? data.terms.map(term => ({
                termNumber: term.term_number,
                amount: term.amount,
                dueDate: new Date(term.due_date),
                isPaid: term.is_paid || false
              })) : []
            }
          }
        }
      }
    });
    return { status: 'success', message: 'Student created successfully', student_id: student.id, student };
  } catch (err) {
    return { status: 'fail', message: err.message };
  }
};

const updateStudent = async (data) => {
  // Optionally hash password if provided
  let updateData = {
    firstName: data.first_name,
    lastName: data.last_name,
    gender: { connect: { id: Number(data.gender.id) } },
    fatherName: data.father_name,
    motherName: data.mother_name,
    fatherOccupation: data.father_occupation?.id || data.father_occupation, // always save as string
    motherOccupation: data.mother_occupation?.id || data.mother_occupation, // always save as string
    mobileNumber: data.mobile_number,
    motherMobileNumber: data.mother_mobile_number,
    fatherEmail: data.father_email,
    address: data.address,
    isTransportRequired: data.is_transport_required,
    class: { connect: { id: Number(data.class.id) } },
        section: { connect: { id: Number(data.section.id) } },
  };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  // Update student
  const student = await prisma.student.update({
    where: { id: Number(data.id) },
    data: updateData
  });
  // Update fee details if provided
  if (data.fee_details) {
    await prisma.feeDetails.update({
      where: { studentId: student.id },
      data: {
        totalFee: data.fee_details.total_fee,
        discountAmount: data.fee_details.discount_amount,
        totalTerms: data.fee_details.total_terms,
        remainingAmount: data.fee_details.remaining_amount
      }
    });
  }
  // Update terms: delete old and insert new
  if (Array.isArray(data.terms)) {
    const feeDetails = await prisma.feeDetails.findUnique({ where: { studentId: student.id } });
    if (feeDetails) {
      await prisma.term.deleteMany({ where: { feeId: feeDetails.id } });
      await prisma.term.createMany({
        data: data.terms.map(term => ({
          feeId: feeDetails.id,
          termNumber: term.term_number,
          amount: term.amount,
          dueDate: new Date(term.due_date),
          isPaid: term.is_paid || false
        }))
      });
    }
  }
  return {status: 'success', message: 'Student updated successfully', student };
};

const getStudent = async (params) => {
  const { id, class_id, section_id, mobile_number } = params;
  const where = {};
  if (id) where.id = Number(id);
  if (class_id) where.classId = Number(class_id);
  if (section_id) where.sectionId = Number(section_id);
  if (mobile_number) where.mobileNumber = mobile_number;

  // If searching by id, return single student, else return array
  if (id) {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: {
        class: true,
        section: true,
        feeDetails: {
          include: { terms: true }
        }
      }
    });
    return student;
  } else {
    const students = await prisma.student.findMany({
      where,
      include: {
        class: true,
        section: true,
        gender: true,
      
        feeDetails: {
          include: { terms: true }
        }
      }
    });
    return students;
  }
};

async function getAllClasses() {
  return await prisma.class.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

async function getSectionsByClassId(classId) {
  return await prisma.section.findMany({
    where: { classId: Number(classId) },
    select: {
      id: true,
      name: true,
      classId: true,
    },
  });
}

async function getClasseswithsections() {
  return await prisma.class.findMany({
    include: {
      sections: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
}

async function saveClassroom(data) {
  try{
    const student = await prisma.class.create({
      data: {
        name:data.className
      }
    });
    return { status: 'success', message: 'Class created successfully', student };
  }catch(e){

  }
}

async function saveSection(data) {
  try{
    const student = await prisma.section.create({
      data: {
        name:data.sectionName,
        classId:data.classId
      }
    });
    return { status: 'success', message: 'Section created successfully', student };
  }catch(e){
    throw new Error('Failed to create section: ' + e.message);
  }
}

// Subject CRUD operations
async function createSubject(data) {
  try {
    const subject = await prisma.subject.create({
      data: {
        name: data.name,
        code: data.code,
        classId: data.classId
      }
    });
    return { status: 'success', message: 'Subject created successfully', subject };
  } catch (e) {
    throw new Error('Failed to create subject: ' + e.message);
  }
}

async function updateSubject(id, data) {
  try {
    const subject = await prisma.subject.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        code: data.code,
        classId: data.classId
      }
    });
    return { status: 'success', message: 'Subject updated successfully', subject };
  } catch (e) {
    throw new Error('Failed to update subject: ' + e.message);
  }
}

async function getSubjectsByClass(classId) {
  try {
    const subjects = await prisma.subject.findMany({
      where: { classId: parseInt(classId) },
      include: {
        class: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    return { status: 'success', subjects };
  } catch (e) {
    throw new Error('Failed to fetch subjects: ' + e.message);
  }
}

module.exports = {
  saveClassroom,
  saveSection,
  createSubject,
  updateSubject,
  getSubjectsByClass,
  createStudent,
  updateStudent,
  getStudent,
  getAllClasses,
  getSectionsByClassId,
  getClasseswithsections,
}; 