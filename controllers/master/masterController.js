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

exports.newFeeStructure  = async (req, res) => {
  try {
    console.log("newFeeStructures Conroller")
    const result = await masterService.newFeeStructures(req, res);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateFeeStructures = async (req, res) => {
  try {
    const result = await masterService.updateFeeStructures(req, res);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllFeeStructures = async (req, res) => {
  try {
    const result = await masterService.getAllFeeStructures(req, res);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getFeeStructuresByClassId = async (req, res) => {
  try {
    const result = await masterService.getFeeStructuresByClassId(req, res);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.createMarksSheetMaster  = async(req, res) => {
    try {
      const result = await masterService.createMarksSheetMaster(req, res);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}

exports.updateMarksSheetMaster  = async (req, res) => {
    try {
      const result = await masterService.updateMarksSheetMaster(req, res);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

exports.getAllMarkSheetMaster  = async (req, res) => {
    try {
      const result = await masterService.getAllMarkSheetMaster(req, res);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

exports.getAllMarkssheetMasterByClassandSection  = async (req, res) => {
    try {
      const result = await masterService.getAllMarkssheetMasterByClassandSection(req, res);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }




