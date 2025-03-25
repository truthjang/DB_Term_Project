import mysql from 'mysql2';

require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '920708',
    database: 'Term_project',
});

const promisePool = pool.promise();

export const selectSql = {
    getUser: async () => {
        const sql = `SELECT * FROM Login`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getDoctor: async () => {
        const sql = `select * from Doctor`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getNurse: async () => {
        const sql = `select * from Nurse`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getExamination: async () => {
        const sql = `select * from Examination`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getTreatment: async () => {
        const sql = `select * from Treatment`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getPatient: async () => {
        const sql = `select * from Patient`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getReservation: async () => {
        const sql = `select * from Reservation`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    selectPatient: async (data) => {
        const sql = `select * from Patient where Doctor_Doctor_ID = "${data.Doctor_Doctor_ID}"`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    select2Patient: async (data) => {
        const sql = `select * from Patient where Nurse_Nurse_ID = "${data.Nurse_Nurse_ID}"`;
        const [result] = await promisePool.query(sql);
        return result;
    },
}

// insert query
export const insertSql = {
    setDoctor: async (data) => {
        console.log(data);
        const sql = `insert into Doctor values (
            "${data.Doctor_ID}", "${data.Password}", "${data.Name}", "${data.Address}", 
            "${data.Phone_number}", "${data.Medical_Specialty_Department_ID}"
        )`
        console.log(sql);
        await promisePool.query(sql);
    },
    setExamination: async (data) => {
        console.log(data);
        const sql = `insert into Examination values (
            "${data.Examination_number}", "${data.Examination_Date_Time}", "${data.Examination_Details}",
            "${data.Doctor_Doctor_ID}", "${data.Patient_Patient_ID}"
        )`
        console.log(sql);
        await promisePool.query(sql);
    },
    setTreatment: async (data) => {
        console.log(data);
        const sql = `insert into Treatment values (
            "${data.Treatment_number}", "${data.Treatment_Date_Time}", "${data.Treatment_Details}",
            "${data.Nurse_Nurse_ID}", "${data.Patient_Patient_ID}"
        )`
        console.log(sql);
        await promisePool.query(sql);
    },
    setReservation: async (data) => {
        console.log(data);
        const sql = `insert into Reservation values (
            "${data.Reservation_number}", "${data.Reservation_Date_Time}", 
            "${data.Medical_Specialty_Department_ID}", "${data.Patient_Patient_ID}"
        )`
        console.log(sql);
        await promisePool.query(sql);
    },
    setNurse: async (data) => {
        console.log(data);
        const sql = `insert into Nurse values (
            "${data.Nurse_ID}", "${data.Password}", "${data.Name}", "${data.Address}", 
            "${data.Phone_number}", "${data.Medical_Specialty_Department_ID}"
        )`
        console.log(sql);
        await promisePool.query(sql);
    },
};


// update query
export const updateSql = {
    updateDoctor: async (data) => {
        console.log(data);
        const sql = `
            UPDATE Doctor 
            SET Password = ${data.Password}, Name = "${data.Name}", 
            Address = "${data.Address}", Phone_number = "${data.Phone_number}",
            Medical_Specialty_Department_ID = "${data.Medical_Specialty_Department_ID}"
            WHERE Doctor_ID = ${data.Doctor_ID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateExamination: async (data) => {
        console.log(data);

        // Ensure data.Examination_Date_Time is a Date object
        data.Examination_Date_Time = new Date(data.Examination_Date_Time);
        // Examination_Date_Time을 MySQL 형식으로 변환
        const formattedDate = data.Examination_Date_Time.toISOString().slice(0, 19).replace('T', ' ');

        const sql = `
            UPDATE Examination 
            SET Examination_Date_Time = '${formattedDate}',
            Examination_Details = "${data.Examination_Details}", 
            Doctor_Doctor_ID = "${data.Doctor_Doctor_ID}",
            Patient_Patient_ID = "${data.Patient_Patient_ID}"
            WHERE Examination_number = ${data.Examination_number}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateTreatment: async (data) => {
        console.log(data);

        // Ensure data.Treatment_Date_Time is a Date object
        data.Treatment_Date_Time = new Date(data.Treatment_Date_Time);
        // Treatment_Date_Time을 MySQL 형식으로 변환
        const formattedDate = data.Treatment_Date_Time.toISOString().slice(0, 19).replace('T', ' ');

        const sql = `
            UPDATE Treatment 
            SET Treatment_Date_Time = '${formattedDate}',
            Treatment_Details = "${data.Treatment_Details}", 
            Nurse_Nurse_ID = "${data.Nurse_Nurse_ID}",
            Patient_Patient_ID = "${data.Patient_Patient_ID}"
            WHERE Treatment_number = ${data.Treatment_number}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateNurse: async (data) => {
        console.log(data);
        const sql = `
            UPDATE Nurse 
            SET Password = ${data.Password}, Name = "${data.Name}", 
            Address = "${data.Address}", Phone_number = "${data.Phone_number}",
            Medical_Specialty_Department_ID = "${data.Medical_Specialty_Department_ID}"
            WHERE Nurse_ID = ${data.Nurse_ID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
};


export const deleteSql = {
    deleteDoctor: async (data) => {
        console.log('delete Doctor Doctor_ID =', data);
        const sql = `delete from Doctor where Doctor_ID=${data.Doctor_ID}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteExamination: async (data) => {
        console.log('delete Examination Examination_number =', data);
        const sql = `delete from Examination where Examination_number=${data.Examination_number}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteTreatment: async (data) => {
        console.log('delete Treatment Treatment_number =', data);
        const sql = `delete from Treatment where Treatment_number=${data.Treatment_number}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteReservation: async (data) => {
        console.log('delete Reservation Reservation_number =', data);
        const sql = `delete from Reservation where Reservation_number=${data.Reservation_number}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteNurse: async (data) => {
        console.log('delete Nurse Nurse_ID =', data);
        const sql = `delete from Nurse where Nurse_ID=${data.Nurse_ID}`
        console.log(sql);
        await promisePool.query(sql);
    },
};

