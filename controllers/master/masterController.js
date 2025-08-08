const masterService = require('../../services/master/masterService');

exports.createDropdown = async (req, res) => {
  try {
    const { type, value } = req.body;
    if (!type || !value) {
      return res.status(400).json({ message: 'type and value are required' });
    }
    const result = await masterService.createDropdown(type, value);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createExam = async (req, res) => {
  try {
   // const { type, value } = req.body;
    // if (!type || !value) {
    //   return res.status(400).json({ message: 'type and value are required' });
    // }
    const result = await masterService.createExam(req, res);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDropdownByType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ message: 'type is required' });
    }
    const result = await masterService.getDropdownByType(type);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 