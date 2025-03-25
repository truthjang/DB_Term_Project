import express from 'express';
import { selectSql, updateSql, insertSql, deleteSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('2')) {
        //const Patient = await selectSql.getPatient();
        const Treatment = await selectSql.getTreatment();
        res.render('EmployeeNur', {
            //title: "Patient",
            //Patient,
            title2: "Treatment",
            Treatment,
        });
    } 
    else {
        res.redirect('/');
    }
});


router.get('/updateTreatment', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('2')) {
        const Treatment_res = await selectSql.getTreatment();
        console.log(Treatment_res)
        res.render('updateTreatment', {
            main_title: "UPDATE 'Treatment' table",
            Treatment_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/updateTreatment', async (req, res) => {
    const vars = req.body;
    const data = {
        Treatment_number: vars.Treatment_number,
        Treatment_Date_Time: vars.Treatment_Date_Time,
        Treatment_Details: vars.Treatment_Details,
        Nurse_Nurse_ID: vars.Nurse_Nurse_ID,
        Patient_Patient_ID: vars.Patient_Patient_ID,
    }
    await updateSql.updateTreatment(data);

    res.redirect('/EmployeeNur');
})


router.get('/insertTreatment', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('2')) {
        res.render('insertTreatment', {
            data: " "
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/insertTreatment', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Treatment_number: vars.Treatment_number,
        Treatment_Date_Time: vars.Treatment_Date_Time,
        Treatment_Details: vars.Treatment_Details,
        Nurse_Nurse_ID: vars.Nurse_Nurse_ID,
        Patient_Patient_ID: vars.Patient_Patient_ID,
    };
    await insertSql.setTreatment(data);

    res.redirect('/EmployeeNur');
})


router.get('/deleteTreatment', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('2')) {
        const Treatment_res = await selectSql.getTreatment();
        res.render('deleteTreatment', {
            title: "Delete 'Treatment' table",
            Treatment_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteTreatment', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Treatment_number: req.body.delBtn,
    };

    await deleteSql.deleteTreatment(data);

    res.redirect('/EmployeeNur');
});

//여기서부터는 Patient 검색
router.get('/selectPatient2', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('2')) {
        
        res.render('selectPatient2', {
            data: " ",
            
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/selectPatient2', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Nurse_Nurse_ID: vars.Nurse_Nurse_ID,
    };
    const selPatient = await selectSql.select2Patient(data);

    res.render('selectPatient2', {
        data: " ",
        title2: "selected Patient",
        selPatient,
    });

})

module.exports = router;
