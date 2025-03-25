USE Term_project;

CREATE VIEW Login AS
SELECT Doctor_ID AS UserID, Password
FROM Doctor
UNION
SELECT Nurse_ID AS UserID, Password
FROM Nurse
UNION
SELECT Patient_ID AS UserID, Password
FROM Patient
UNION
SELECT Id AS UserID, Password
FROM Administrator;

