const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new time period
exports.createTimePeriod = async (timePeriodData) => {
  try {
    // Validate teacher exists
    const teacher = await prisma.staff.findUnique({
      where: { id: parseInt(timePeriodData.teacherId) }
    });
    
    if (!teacher) {
      throw new Error('Assigned teacher not found');
    }

    const timePeriod = await prisma.timePeriod.create({
      data: {
        periodName: timePeriodData.periodName,
        subject: timePeriodData.subject,
        startDate: new Date(timePeriodData.startDate),
        endDate: new Date(timePeriodData.endDate),
        startTime: timePeriodData.startTime,
        endTime: timePeriodData.endTime,
        teacherId: parseInt(timePeriodData.teacherId),
        isActive: timePeriodData.isActive !== undefined ? timePeriodData.isActive : true
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
      }
    });
    return timePeriod;
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
exports.updateTimePeriod = async (id, updateData) => {
  try {
    const existingTimePeriod = await prisma.timePeriod.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTimePeriod) {
      throw new Error('Time period not found');
    }

    // Validate teacher if teacherId is being updated
    if (updateData.teacherId) {
      const teacher = await prisma.staff.findUnique({
        where: { id: parseInt(updateData.teacherId) }
      });
      
      if (!teacher) {
        throw new Error('Assigned teacher not found');
      }
    }

    const updatedTimePeriod = await prisma.timePeriod.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
        endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
        teacherId: updateData.teacherId ? parseInt(updateData.teacherId) : undefined
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
      }
    });
    
    return updatedTimePeriod;
  } catch (error) {
    throw new Error(`Error updating time period: ${error.message}`);
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
