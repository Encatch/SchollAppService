const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new staff member
exports.createStaff = async (staffData) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      qualification,
      department,
      designation,
      staffType,
      experience,
      mobileNumber,
      email,
      username,
      password,
      salary,
      isTransportRequired
    } = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    let uniqueUsername = username;
    while (await prisma.student.findUnique({ where: { username: uniqueUsername } })) {
      uniqueUsername = `${username}${count}`;
      count++;
    }
    username = uniqueUsername;
    const newStaff = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        genderId: gender?.id || null,
        qualificationId: qualification?.id || null,
        departmentId: department?.id || null,
        designationId: designation?.id || null,
        staffTypeId: staffType?.id || null,
        experience,
        mobileNumber,
        email,
        username,
        hashedPassword,
        salary,
        isTransportRequired
      },
      include: {
        gender: true,
        qualification: true,
        department: true,
        designation: true,
        staffType: true
      }
    });

    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    throw new Error(`Error creating staff: ${error.message}`);
  }
};

// Get all staff members
exports.getAllStaff = async (filters = {}) => {
  try {
    const where = {};
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    
    if (filters.designation) {
      where.designation = {
        contains: filters.designation,
        mode: 'insensitive'
      };
    }
    
    if (filters.department) {
      where.department = {
        contains: filters.department,
        mode: 'insensitive'
      };
    }

    const staff = await prisma.staff.findMany({
      where,
      include: {
        timePeriods: {
          where: { isActive: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return staff;
  } catch (error) {
    throw new Error(`Error fetching staff: ${error.message}`);
  }
};

// Get staff by ID
exports.getStaffById = async (id) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: parseInt(id) },
      include: {
        timePeriods: {
          where: { isActive: true }
        }
      }
    });
    
    if (!staff) {
      throw new Error('Staff member not found');
    }
    
    return staff;
  } catch (error) {
    throw new Error(`Error fetching staff: ${error.message}`);
  }
};

// Update staff
exports.updateStaff = async (id, updateData) => {
  try {
    const existingStaff = await prisma.staff.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingStaff) {
      throw new Error('Staff member not found');
    }

    const updatedStaff = await prisma.staff.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        joiningDate: updateData.joiningDate ? new Date(updateData.joiningDate) : undefined
      },
      include: {
        timePeriods: {
          where: { isActive: true }
        }
      }
    });
    
    return updatedStaff;
  } catch (error) {
    throw new Error(`Error updating staff: ${error.message}`);
  }
};

// Delete staff (soft delete)
exports.deleteStaff = async (id) => {
  try {
    const existingStaff = await prisma.staff.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingStaff) {
      throw new Error('Staff member not found');
    }

    const deletedStaff = await prisma.staff.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });
    
    return deletedStaff;
  } catch (error) {
    throw new Error(`Error deleting staff: ${error.message}`);
  }
};

// Get active teachers for dropdown
exports.getActiveTeachers = async () => {
  try {
    const teachers = await prisma.staff.findMany({
      where: { 
        isActive: true,
        designation: {
          contains: 'teacher',
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        designation: true
      },
      orderBy: {
        firstName: 'asc'
      }
    });
    return teachers;
  } catch (error) {
    throw new Error(`Error fetching teachers: ${error.message}`);
  }
};
