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
router.get('/timeperiods/:id', timePeriodController.getTimePeriodById);
router.put('/timeperiods/:id', timePeriodController.updateTimePeriod);
router.delete('/timeperiods/:id', timePeriodController.deleteTimePeriod);
router.get('/timeperiods/teacher/:teacherId', timePeriodController.getTimePeriodsByTeacher);

module.exports = router;