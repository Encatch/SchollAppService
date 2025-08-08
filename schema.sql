-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Sections table
CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  father_name VARCHAR(100),
  mother_name VARCHAR(100),
  father_occupation VARCHAR(100),
  mother_occupation VARCHAR(100),
  mobile_number VARCHAR(20),
  mother_mobile_number VARCHAR(20),
  father_email VARCHAR(255),
  address TEXT,
  is_transport_required BOOLEAN,
  class_id INT,
  section_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (section_id) REFERENCES sections(id)
);

-- Fee Details table
CREATE TABLE IF NOT EXISTS fee_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  total_fee DECIMAL(10,2),
  discount_amount DECIMAL(10,2),
  total_terms INT,
  remaining_amount DECIMAL(10,2),
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Terms table
CREATE TABLE IF NOT EXISTS terms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fee_id INT,
  term_number INT,
  amount DECIMAL(10,2),
  due_date DATE,
  is_paid BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (fee_id) REFERENCES fee_details(id)
); 

INSERT INTO class (name) VALUES
('LKG'),
('UKG'),
('1st'),
('2nd'),
('3rd'),
('4th'),
('5th'),
('6th'),
('7th'),
('8th'),
('9th'),
('10th'),
('11th'),
('12th');

-- For each class, insert section A and B
INSERT INTO section (name, classId) VALUES
('A', 1), ('B', 1),   -- LKG
('A', 2), ('B', 2),   -- UKG
('A', 3), ('B', 3),   -- 1st
('A', 4), ('B', 4),   -- 2nd
('A', 5), ('B', 5),   -- 3rd
('A', 6), ('B', 6),   -- 4th
('A', 7), ('B', 7),   -- 5th
('A', 8), ('B', 8),   -- 6th
('A', 9), ('B', 9),   -- 7th
('A', 10), ('B', 10), -- 8th
('A', 11), ('B', 11), -- 9th
('A', 12), ('B', 12), -- 10th
('A', 13), ('B', 13), -- 11th
('A', 14), ('B', 14); -- 12th

ALTER TABLE sections ADD COLUMN classId INT;
ALTER TABLE sections ADD FOREIGN KEY (classId) REFERENCES classes(id);

