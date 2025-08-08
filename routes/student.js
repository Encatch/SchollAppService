const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.put('/', studentController.updateStudent);
router.get('/', studentController.getStudent);
router.get('/classes', studentController.getAllClasses);
router.get('/sections', studentController.getSectionsByClassId);
router.get('/classeswithsections', studentController.getClasseswithsections);
router.post('/saveClassroom', studentController.saveClassroom);
router.post('/saveSection', studentController.saveSection);

// Subject routes
router.post('/createSubject', studentController.createSubject);
router.put('/updateSubject/:id', studentController.updateSubject);
router.get('/subjects/:classId', studentController.getSubjectsByClass);

module.exports = router;