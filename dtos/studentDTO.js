class StudentDTO {
  constructor(data) {
    this._username = data.username;
    this._password = data.password;
    this._firstName = data.first_name;
    this._lastName = data.last_name;
    this._gender = data.gender;
    this._fatherName = data.father_name;
    this._motherName = data.mother_name;
    this._fatherOccupation = data.father_occupation;
    this._motherOccupation = data.mother_occupation;
    this._mobileNumber = data.mobile_number;
    this._motherMobileNumber = data.mother_mobile_number;
    this._fatherEmail = data.father_email;
    this._address = data.address;
    this._isTransportRequired = data.is_transport_required;
    this._classId = data.class && data.class.class_id;
    this._sectionId = data.section && data.section.section_id;
    this._feeDetails = data.fee_details;
    this._terms = data.terms;
  }

  get username() { return this._username; }
  set username(value) { this._username = value; }

  get password() { return this._password; }
  set password(value) { this._password = value; }

  get firstName() { return this._firstName; }
  set firstName(value) { this._firstName = value; }

  get lastName() { return this._lastName; }
  set lastName(value) { this._lastName = value; }

  get gender() { return this._gender; }
  set gender(value) { this._gender = value; }

  get fatherName() { return this._fatherName; }
  set fatherName(value) { this._fatherName = value; }

  get motherName() { return this._motherName; }
  set motherName(value) { this._motherName = value; }

  get fatherOccupation() { return this._fatherOccupation; }
  set fatherOccupation(value) { this._fatherOccupation = value; }

  get motherOccupation() { return this._motherOccupation; }
  set motherOccupation(value) { this._motherOccupation = value; }

  get mobileNumber() { return this._mobileNumber; }
  set mobileNumber(value) { this._mobileNumber = value; }

  get motherMobileNumber() { return this._motherMobileNumber; }
  set motherMobileNumber(value) { this._motherMobileNumber = value; }

  get fatherEmail() { return this._fatherEmail; }
  set fatherEmail(value) { this._fatherEmail = value; }

  get address() { return this._address; }
  set address(value) { this._address = value; }

  get isTransportRequired() { return this._isTransportRequired; }
  set isTransportRequired(value) { this._isTransportRequired = value; }

  get classId() { return this._classId; }
  set classId(value) { this._classId = value; }

  get sectionId() { return this._sectionId; }
  set sectionId(value) { this._sectionId = value; }

  get feeDetails() { return this._feeDetails; }
  set feeDetails(value) { this._feeDetails = value; }

  get terms() { return this._terms; }
  set terms(value) { this._terms = value; }
}

module.exports = StudentDTO; 