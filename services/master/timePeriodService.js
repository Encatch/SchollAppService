const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new time period
exports.createTimePeriod = async (req, res) => {
  try {
    // Validate teacher exists
    const {
      periodName,
      subjectId,
      classId,
      sectionId,
      startDate,
      endDate,
      startTime,
      endTime,
      teacherId,
      isActive
    } = req.body;

    const newPeriod = await prisma.timePeriod.create({
      data: {
        periodName,
        subjectId,
        classId,
        sectionId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        teacherId,
        isActive
      }
    });

    res.status(201).json(newPeriod);
  } catch (error) {
    throw new Error(`Error creating time period: ${error.message}`);
  }
};

// Get all time periods
exports.getAllTimePeriods = async (filters = {}) => {
  try {
    const where = {};
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    
    if (filters.subject) {
      where.subject = {
        contains: filters.subject,
        mode: 'insensitive'
      };
    }
    
    if (filters.teacherId) {
      where.teacherId = parseInt(filters.teacherId);
    }
    
    if (filters.startDate && filters.endDate) {
      where.startDate = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate)
      };
    }

    const timePeriods = await prisma.timePeriod.findMany({
      where,
      include: {
        assignedTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            designation: true
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });
    return timePeriods;
  } catch (error) {
    throw new Error(`Error fetching time periods: ${error.message}`);
  }
};

// Get time period by ID
exports.getTimePeriodById = async (id) => {
  try {
    const timePeriod = await prisma.timePeriod.findUnique({
      where: { id: parseInt(id) },
      include: {
        assignedTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            designation: true,
            email: true
          }
        }
      }
    });
    
    if (!timePeriod) {
      throw new Error('Time period not found');
    }
    
    return timePeriod;
  } catch (error) {
    throw new Error(`Error fetching time period: ${error.message}`);
  }
};

// Update time period
exports.updateTimePeriod = async (req, res) => {
  try {
    console.log('Update Time Period Request:', req.body);
    const { id } = req.body;
    const {
      periodName,
      subjectId,
      classId,
      sectionId,
      startDate,
      endDate,
      startTime,
      endTime,
      teacherId,
      isActive
    } = req.body;

    const updatedPeriod = await prisma.timePeriod.update({
      where: { id: parseInt(id) },
      data: {
        periodName,
        subjectId,
        classId,
        sectionId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        teacherId,
        isActive
      }
    });
    res.status(201).json(updatedPeriod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete time period (soft delete)
exports.deleteTimePeriod = async (id) => {
  try {
    const existingTimePeriod = await prisma.timePeriod.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTimePeriod) {
      throw new Error('Time period not found');
    }

    const deletedTimePeriod = await prisma.timePeriod.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });
    
    return deletedTimePeriod;
  } catch (error) {
    throw new Error(`Error deleting time period: ${error.message}`);
  }
};

// Get time periods by teacher
exports.getTimePeriodsByTeacher = async (teacherId) => {
  try {
    const timePeriods = await prisma.timePeriod.findMany({
      where: { 
        teacherId: parseInt(teacherId),
        isActive: true
      },
      include: {
        assignedTeacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            designation: true
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });
    return timePeriods;
  } catch (error) {
    throw new Error(`Error fetching teacher's time periods: ${error.message}`);
  }
};
