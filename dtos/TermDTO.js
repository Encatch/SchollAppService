class TermDTO {
  constructor(data) {
    this._termNumber = data.term_number;
    this._amount = data.amount;
    this._dueDate = data.due_date;
    this._isPaid = data.is_paid || false;
  }

  get termNumber() { return this._termNumber; }
  set termNumber(value) { this._termNumber = value; }

  get amount() { return this._amount; }
  set amount(value) { this._amount = value; }

  get dueDate() { return this._dueDate; }
  set dueDate(value) { this._dueDate = value; }

  get isPaid() { return this._isPaid; }
  set isPaid(value) { this._isPaid = value; }
}

module.exports = TermDTO; 