const timePeriodService = require('../../services/master/timePeriodService');

// Create a new time period
exports.createTimePeriod = async (req, res) => {
  try {
    const { periodName, subject, startDate, endDate, startTime, endTime, teacherId, isActive } = req.body;
    
    // Validation
    if (!periodName || !subject || !startDate || !endDate || !startTime || !endTime || !teacherId) {
      return res.status(400).json({ 
        message: 'periodName, subject, startDate, endDate, startTime, endTime, and teacherId are required' 
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({ 
        message: 'Time format should be HH:MM (24-hour format)' 
      });
    }

    const timePeriodData = {
      periodName,
      subject,
      startDate,
      endDate,
      startTime,
      endTime,
      teacherId,
      isActive
    };

    const result = await timePeriodService.createTimePeriod(timePeriodData);
    res.status(201).json({
      message: 'Time period created successfully',
      data: result
    });
  } catch (error) {
    console.error('Error creating time period:', error);
    res.status(500).json({ 
      message: error.message || 'Server error while creating time period' 
    });
  }
};

// Get all time periods
exports.getAllTimePeriods = async (req, res) => {
  try {
    const { isActive, subject, teacherId, startDate, endDate } = req.query;
    
    const filters = {};
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    if (subject) filters.subject = subject;
    if (teacherId) filters.teacherId = teacherId;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const result = await timePeriodService.getAllTimePeriods(filters);
    res.json({
      message: 'Time periods retrieved successfully',
      data: result,
      count: result.length
    });
  } catch (error) {
    console.error('Error fetching time periods:', error);
    res.status(500).json({ 
      message: error.message || 'Server error while fetching time periods' 
    });
  }
};

// Get time period by ID
exports.getTimePeriodById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid time period ID is required' });
    }

    const result = await timePeriodService.getTimePeriodById(id);
    res.json({
      message: 'Time period retrieved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error fetching time period by ID:', error);
    if (error.message === 'Time period not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while fetching time period' 
    });
  }
};

// Update time period
exports.updateTimePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid time period ID is required' });
    }

    // Validate time format if provided
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (updateData.startTime && !timeRegex.test(updateData.startTime)) {
      return res.status(400).json({ 
        message: 'Start time format should be HH:MM (24-hour format)' 
      });
    }
    if (updateData.endTime && !timeRegex.test(updateData.endTime)) {
      return res.status(400).json({ 
        message: 'End time format should be HH:MM (24-hour format)' 
      });
    }

    const result = await timePeriodService.updateTimePeriod(id, updateData);
    res.json({
      message: 'Time period updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error updating time period:', error);
    if (error.message === 'Time period not found' || error.message === 'Assigned teacher not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while updating time period' 
    });
  }
};

// Delete time period (soft delete)
exports.deleteTimePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid time period ID is required' });
    }

    const result = await timePeriodService.deleteTimePeriod(id);
    res.json({
      message: 'Time period deleted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error deleting time period:', error);
    if (error.message === 'Time period not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while deleting time period' 
    });
  }
};

// Get time periods by teacher
exports.getTimePeriodsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    
    if (!teacherId || isNaN(teacherId)) {
      return res.status(400).json({ message: 'Valid teacher ID is required' });
    }

    const result = await timePeriodService.getTimePeriodsByTeacher(teacherId);
    res.json({
      message: 'Teacher time periods retrieved successfully',
      data: result,
      count: result.length
    });
  } catch (error) {
    console.error('Error fetching teacher time periods:', error);
    res.status(500).json({ 
      message: error.message || 'Server error while fetching teacher time periods' 
    });
  }
};
