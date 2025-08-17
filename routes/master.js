const express = require('express');
const router = express.Router();
const masterController = require('../controllers/master/masterController');
const staffController = require('../controllers/master/staffController');
const timePeriodController = require('../controllers/master/timePeriodController');

// Master Dropdown routes
router.post('/', masterController.createDropdown);
router.get('/', masterController.getDropdownByType);

// Staff CRUD routes
router.post('/createExam', masterController.createExam);

// Time Period CRUD routes
router.post('/timeperiods', timePeriodController.createTimePeriod);
router.get('/timeperiods', timePeriodController.getAllTimePeriods);
router.get('/timeperiodsByClassAndSection', timePeriodController.getTimePeriodsByClassAndSection);
router.get('/timeperiods/:id', timePeriodController.getTimePeriodById);
router.put('/timeperiods', timePeriodController.updateTimePeriod);
router.delete('/timeperiods/:id', timePeriodController.deleteTimePeriod);
router.get('/timeperiods/teacher/:teacherId', timePeriodController.getTimePeriodsByTeacher);

router.post('/fee-structure', masterController.newFeeStructure);
router.put('/fee-structure', masterController.updateFeeStructures);
router.get('/fee-structure', masterController.getAllFeeStructures);
router.get('/fee-structure/:classId', masterController.getFeeStructuresByClassId);

router.post('/marksheets', masterController.createMarksSheetMaster);
router.put('/marksheets', masterController.updateMarksSheetMaster);
router.get('/marksheets', masterController.getAllMarkSheetMaster);
router.get('/marksheets/:classId/:sectionId', masterController.getAllMarkssheetMasterByClassandSection);

module.exports = router;