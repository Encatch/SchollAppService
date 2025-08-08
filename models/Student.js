const db = require('../db');

class Student {
  static async create(studentDTO) {
    const [result] = await db.execute(
      `INSERT INTO students (username, password, first_name, last_name, gender, father_name, mother_name, father_occupation, mother_occupation, mobile_number, mother_mobile_number, father_email, address, is_transport_required, class_id, section_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentDTO.username,
        studentDTO.password,
        studentDTO.firstName,
        studentDTO.lastName,
        studentDTO.gender,
        studentDTO.fatherName,
        studentDTO.motherName,
        studentDTO.fatherOccupation,
        studentDTO.motherOccupation,
        studentDTO.mobileNumber,
        studentDTO.motherMobileNumber,
        studentDTO.fatherEmail,
        studentDTO.address,
        studentDTO.isTransportRequired,
        studentDTO.classId,
        studentDTO.sectionId
      ]
    );
    return result.insertId;
  }

  static async update(student_id, studentDTO) {
    await db.execute(
      `UPDATE students SET first_name=?, last_name=?, gender=?, father_name=?, mother_name=?, father_occupation=?, mother_occupation=?, mobile_number=?, mother_mobile_number=?, father_email=?, address=?, is_transport_required=?, class_id=?, section_id=? WHERE id=?`,
      [
        studentDTO.firstName,
        studentDTO.lastName,
        studentDTO.gender,
        studentDTO.fatherName,
        studentDTO.motherName,
        studentDTO.fatherOccupation,
        studentDTO.motherOccupation,
        studentDTO.mobileNumber,
        studentDTO.motherMobileNumber,
        studentDTO.fatherEmail,
        studentDTO.address,
        studentDTO.isTransportRequired,
        studentDTO.classId,
        studentDTO.sectionId,
        student_id
      ]
    );
  }
}

module.exports = Student; 