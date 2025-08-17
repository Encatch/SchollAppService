const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createStaff = async (data) => {
  try {
    const staff = await prisma.staff.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        genderId: data.gender?.id || null,
        qualificationId: data.qualification?.id || null,
        departmentId: data.department?.id || null,
        designationId: data.designation?.id || null,
        staffTypeId: data.staffType?.id || null,
        experience: data.experience || null,
        mobileNumber: data.mobile || null,
        email: data.email,
        username: data.username,
        password: data.password, // hash this in production
        salary: data.salary ? parseFloat(data.salary) : null, // safe cast
        isActive: data.active !== undefined ? data.active : true,
        isTransportRequired: data.transportRequired !== undefined ? data.transportRequired : false,
        timePeriods: data.time_periods && Array.isArray(data.time_periods)
          ? { connect: data.time_periods.map(id => ({ id })) }
          : undefined,
      },
      include: {
        gender: true,
        qualification: true,
        department: true,
        designation: true,
        staffType: true,
        timePeriods: true,
      }
    });
    console.log("Staff created successfully:", staff);
   
    return { status: 'success', message: 'Staff created successfully', staff_id: staff.id, staff };
  } catch (err) {
    console.log("Staff un", err);
    return { status: 'fail', message: err.message };
  }
};

const updateStaff = async ( data) => {
  try {
    const staff = await prisma.staff.update({
      where: { id: Number(data.id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        genderId: data.gender?.id || null,
        qualificationId: data.qualification?.id || null,
        departmentId: data.department?.id || null,
        designationId: data.designation?.id || null,
        staffTypeId: data.staffType?.id || null,
        experience: data.experience || null,
        mobileNumber: data.mobile || null,
        email: data.email,
        username: data.username,
        password: data.password, // hash this in production
        salary: data.salary ? parseFloat(data.salary) : null, // safe cast
        isActive: data.active !== undefined ? data.active : true,
        isTransportRequired: data.transportRequired !== undefined ? data.transportRequired : false,
        timePeriods: data.time_periods && Array.isArray(data.time_periods)
          ? { connect: data.time_periods.map(id => ({ id })) }
          : undefined,
      },
      include: {
        gender: true,
        qualification: true,
        department: true,
        designation: true,
        staffType: true,
        timePeriods: true,
      }
    });
    return { status: 'success', message: 'Staff updated successfully', staff };
  } catch (err) {
    return { status: 'fail', message: err.message };
  }
};

const getStaff = async (req, res) => {
  try {
    const id = req.query.id;

    if (id) {
      const staff = await prisma.staff.findUnique({
        where: { id: parseInt(id) },
        include: {
          gender: true,
          qualification: true,
          department: true,
          designation: true,
          staffType: true,
          timePeriods: true
        }
      });

      if (!staff) {
        return res.status(404).json({ success: false, message: "Staff not found" });
      }

      return res.json({ success: true, data: staff });
    }
    const allStaff = await prisma.staff.findMany({
      include: {
        gender: true,
        qualification: true,
        department: true,
        designation: true,
        staffType: true,
        timePeriods: true
      }
    });
    res.json({ success: true, data: allStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
  // const where = {};
  // if (params.id) where.id = Number(params.id);
  // if (params.departmentId) where.departmentId = Number(params.departmentId);
  // if (params.username) where.username = params.username;
  // // Add more filters as needed

  // const staff = params.id
  //   ? await prisma.staff.findUnique({ where, include: { gender: true, qualification: true, department: true, designation: true, staffType: true, timePeriods: true } })
  //   : await prisma.staff.findMany({ where, include: { gender: true, qualification: true, department: true, designation: true, staffType: true, timePeriods: true } });

  // return staff;
};

const deleteStaff = async (id) => {
  try {
    await prisma.staff.delete({ where: { id: Number(id) } });
    return { status: 'success', message: 'Staff deleted successfully' };
  } catch (err) {
    return { status: 'fail', message: err.message };
  }
};

const getActiveTeachers = async () => {
  try {
    const teachers = await prisma.staff.findMany({
      where: { 
        isActive: true,
        staffType:{
          id: 14 // Assuming 14 is the ID for teachers
        }
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


module.exports = {
  createStaff,
  updateStaff,
  getStaff,
  deleteStaff,
  getActiveTeachers
}; 