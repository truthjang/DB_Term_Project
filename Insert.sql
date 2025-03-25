USE Term_project;

CREATE TABLE IF NOT EXISTS `Term_project`.`Administrator` (
    Id VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255),
    Role VARCHAR(255)
);

-- Administrator 테이블에 값 입력
INSERT INTO Administrator (Id, Password, Role)
VALUES 
('admin1', '1234', 'super'),
('admin2', '1234', 'super');

-- Medical_Specialty 테이블에 값 입력
INSERT INTO Term_project.Medical_Specialty (Department_ID, Department_Name, Phone_number)
VALUES 
(1, 'Cardiology', '123-456-7890'),
(2, 'Orthopedics', '234-567-8901'),
(3, 'Dermatology', '345-678-9012'),
(4, 'Neurology', '456-789-0123'),
(5, 'Ophthalmology', '567-890-1234');

-- Doctor 테이블에 값 입력
INSERT INTO Term_project.Doctor (Doctor_ID, Password, Name, Address, Phone_number, Medical_Specialty_Department_ID)
VALUES 
(10001, '12341', 'Dr.Smith', '123 Main St', '987-654-3210', 1),
(10002, '12341', 'Dr.Johnson', '456 Oak St', '876-543-2109', 2),
(10003, '12341', 'Dr.Williams', '789 Pine St', '765-432-1098', 3),
(10004, '12341', 'Dr.Jones', '012 Elm St', '654-321-0987', 4),
(10005, '12341', 'Dr.Davis', '345 Birch St', '543-210-9876', 5);

-- Nurse 테이블에 값 입력
INSERT INTO Term_project.Nurse (Nurse_ID, Password, Name, Address, Phone_number, Medical_Specialty_Department_ID)
VALUES 
(20001, '12342', 'Nurse Anderson', '678 Cedar St', '432-109-8765', 1),
(20002, '12342', 'Nurse White', '901 Maple St', '321-098-7654', 2),
(20003, '12342', 'Nurse Martinez', '234 Pine St', '210-987-6543', 3),
(20004, '12342', 'Nurse Taylor', '567 Walnut St', '109-876-5432', 4),
(20005, '12342', 'Nurse Miller', '890 Birch St', '098-765-4321', 5);

-- Patient 테이블에 값 입력
INSERT INTO Term_project.Patient (Patient_ID, Name, SSN, Password, Address, Gender, Blood_Type, Height, Weight, Phone_number, Doctor_Doctor_ID, Nurse_Nurse_ID)
VALUES 
(30001, 'John Doe', '123-45-6789', '12343', '123 Pine St', 'Male', 'A+', '175cm', '70kg', '987-654-3210', 10001, 20001),
(30002, 'Jane Smith', '234-56-7890', '12343', '456 Oak St', 'Female', 'B-', '160cm', '55kg', '876-543-2109', 10002, 20002),
(30003, 'Bob Johnson', '345-67-8901', '12343', '789 Elm St', 'Male', 'O+', '180cm', '80kg', '765-432-1098', 10003, 20003),
(30004, 'Alice Williams', '456-78-9012', '12343', '012 Cedar St', 'Female', 'AB+', '155cm', '50kg', '654-321-0987', 10004, 20004),
(30005, 'Charlie Davis', '567-89-0123', '12343', '345 Birch St', 'Male', 'A-', '165cm', '65kg', '543-210-9876', 10005, 20005);

-- Inpatient 테이블에 값 입력
INSERT INTO Term_project.Inpatient (Room_ID, Admission_Date_Time, Discharge_Date_Time, Patient_Patient_ID)
VALUES 
(101, '2023-01-01 08:00:00', '2023-01-05 12:00:00', 30001),
(102, '2023-02-01 10:00:00', '2023-02-05 14:00:00', 30002),
(103, '2023-03-01 12:00:00', '2023-03-05 16:00:00', 30003),
(104, '2023-04-01 14:00:00', '2023-04-05 18:00:00', 30004),
(105, '2023-05-01 16:00:00', '2023-05-05 20:00:00', 30005);

-- Reservation 테이블에 값 입력
INSERT INTO Term_project.Reservation (Reservation_number, Reservation_Date_Time, Medical_Specialty_Department_ID, Patient_Patient_ID)
VALUES 
(1, '2023-01-10 08:00:00', 1, 30001),
(2, '2023-02-10 10:00:00', 2, 30002),
(3, '2023-03-10 12:00:00', 3, 30003),
(4, '2023-04-10 14:00:00', 4, 30004),
(5, '2023-05-10 16:00:00', 5, 30005);

-- Examination 테이블에 값 입력
INSERT INTO Term_project.Examination (Examination_number, Examination_Date_Time, Examination_Details, Doctor_Doctor_ID, Patient_Patient_ID)
VALUES 
(1, '2023-01-15 08:00:00', 'Heart Checkup', 10001, 30001),
(2, '2023-02-15 10:00:00', 'Orthopedic Exam', 10002, 30002),
(3, '2023-03-15 12:00:00', 'Dermatology Consultation', 10003, 30003),
(4, '2023-04-15 14:00:00', 'Neurological Evaluation', 10004, 30004),
(5, '2023-05-15 16:00:00', 'Eye Examination', 10005, 30005);

-- Treatment 테이블에 값 입력
INSERT INTO Term_project.Treatment (Treatment_number, Treatment_Date_Time, Treatment_Details, Nurse_Nurse_ID, Patient_Patient_ID)
VALUES 
(1, '2023-01-20 08:00:00', 'Medication for Heart', 20001, 30001),
(2, '2023-02-20 10:00:00', 'Orthopedic Therapy', 20002, 30002),
(3, '2023-03-20 12:00:00', 'Skin Treatment', 20003, 30003),
(4, '2023-04-20 14:00:00', 'Neurological Therapy', 20004, 30004),
(5, '2023-05-20 16:00:00', 'Eye Surgery', 20005, 30005);
