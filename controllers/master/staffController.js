const staffService = require('../../services/master/staffService');

// Create a new staff member
exports.createStaff = async (req, res) => {
  try {
    const result = await staffService.createStaff(req.body);
    res.status(201).json({
      message: 'Staff member created successfully',
      data: result
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).json({ 
      message: error.message || 'Server error while creating staff member' 
    });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const { isActive, designation, department } = req.query;
    
    const filters = {};
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    if (designation) filters.designation = designation;
    if (department) filters.department = department;

    const result = await staffService.getAllStaff(filters);
    res.json({
      message: 'Staff members retrieved successfully',
      data: result,
      count: result.length
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ 
      message: error.message || 'Server error while fetching staff members' 
    });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid staff ID is required' });
    }

    const result = await staffService.getStaffById(id);
    res.json({
      message: 'Staff member retrieved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error fetching staff by ID:', error);
    if (error.message === 'Staff member not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while fetching staff member' 
    });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid staff ID is required' });
    }

    const result = await staffService.updateStaff(id, updateData);
    res.json({
      message: 'Staff member updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error updating staff:', error);
    if (error.message === 'Staff member not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while updating staff member' 
    });
  }
};

// Delete staff (soft delete)
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid staff ID is required' });
    }

    const result = await staffService.deleteStaff(id);
    res.json({
      message: 'Staff member deleted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error deleting staff:', error);
    if (error.message === 'Staff member not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ 
      message: error.message || 'Server error while deleting staff member' 
    });
  }
};

// Get active teachers for dropdown
// exports.getActiveTeachers = async (req, res) => {
//   try {
//     const result = await staffService.getActiveTeachers();
//     res.json({
//       message: 'Active teachers retrieved successfully',
//       data: result,
//       count: result.length
//     });
//   } catch (error) {
//     console.error('Error fetching active teachers:', error);
//     res.status(500).json({ 
//       message: error.message || 'Server error while fetching active teachers' 
//     });
//   }
// };
