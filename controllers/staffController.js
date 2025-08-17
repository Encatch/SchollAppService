const staffService = require('../services/staffService');

exports.createStaff = async (req, res) => {
  console.log("Creating staff with data:", req.body);
  const result = await staffService.createStaff(req.body);
  res.status(result.status === 'success' ? 201 : 400).json(result);
};

exports.updateStaff = async (req, res) => {
  const result = await staffService.updateStaff(req.body);
  res.status(result.status === 'success' ? 200 : 400).json(result);
};

exports.getStaff = async (req, res) => {
  const result = await staffService.getStaff(req, res);
  res.json(result);
};

exports.getActiveTeachers = async (req, res) => {
  const result = await staffService.getActiveTeachers(req, res);
  res.json(result);
};

exports.deleteStaff = async (req, res) => {
  const result = await staffService.deleteStaff(req.params.id);
  res.status(result.status === 'success' ? 200 : 400).json(result);
}; 