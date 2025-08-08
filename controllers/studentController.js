const studentService = require('../services/studentService');

exports.createStudent = async (req, res) => {
  try {
    const result = await studentService.createStudent(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const result = await studentService.updateStudent(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { id, class_id, section_id, mobile_number } = req.query;
    const result = await studentService.getStudent({ id, class_id, section_id, mobile_number });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const result = await studentService.getAllClasses();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSectionsByClassId = async (req, res) => {
  try {
    const { classId } = req.query;
    if (!classId) {
      return res.status(400).json({ message: 'classId is required' });
    }
    const result = await studentService.getSectionsByClassId(classId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 

exports.getClasseswithsections = async (req, res) => {
  try {
    const result = await studentService.getClasseswithsections();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.saveClassroom = async (req, res) => {
  try {
    const result = await studentService.saveClassroom(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.saveSection = async (req, res) => {
  try {
    const result = await studentService.saveSection(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Subject CRUD controllers
exports.createSubject = async (req, res) => {
  try {
    const result = await studentService.createSubject(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await studentService.updateSubject(id, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

exports.getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await studentService.getSubjectsByClass(classId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}


