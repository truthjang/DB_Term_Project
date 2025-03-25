import express from 'express';
import { selectSql, updateSql, insertSql, deleteSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('1')) {
        //const Patient = await selectSql.getPatient();
        const Examination = await selectSql.getExamination();
        res.render('EmployeeDoc', {
            title2: "Examination",
            Examination,
        });
    } 
    else {
        res.redirect('/');
    }
});


router.get('/updateExamination', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('1')) {
        const Examination_res = await selectSql.getExamination();
        console.log(Examination_res)
        res.render('updateExamination', {
            main_title: "UPDATE 'Examination' table",
            Examination_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/updateExamination', async (req, res) => {
    const vars = req.body;
    const data = {
        Examination_number: vars.Examination_number,
        Examination_Date_Time: vars.Examination_Date_Time,
        Examination_Details: vars.Examination_Details,
        Doctor_Doctor_ID: vars.Doctor_Doctor_ID,
        Patient_Patient_ID: vars.Patient_Patient_ID,
    }
    await updateSql.updateExamination(data);

    res.redirect('/EmployeeDoc');
})


router.get('/insertExamination', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('1')) {
        res.render('insertExamination', {
            data: " "
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/insertExamination', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Examination_number: vars.Examination_number,
        Examination_Date_Time: vars.Examination_Date_Time,
        Examination_Details: vars.Examination_Details,
        Doctor_Doctor_ID: vars.Doctor_Doctor_ID,
        Patient_Patient_ID: vars.Patient_Patient_ID,
    };
    await insertSql.setExamination(data);

    res.redirect('/EmployeeDoc');
})


router.get('/deleteExamination', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('1')) {
        const Examination_res = await selectSql.getExamination();
        res.render('deleteExamination', {
            title: "Delete 'Examination' table",
            Examination_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteExamination', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Examination_number: req.body.delBtn,
    };

    await deleteSql.deleteExamination(data);

    res.redirect('/EmployeeDoc');
});


//여기서부터는 Patient 검색
router.get('/selectPatient', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('1')) {
        
        res.render('selectPatient', {
            data: " ",
            
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/selectPatient', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Doctor_Doctor_ID: vars.Doctor_Doctor_ID,
    };
    const selPatient = await selectSql.selectPatient(data);

    res.render('selectPatient', {
        data: " ",
        title2: "selected Patient",
        selPatient,
    });

})

module.exports = router;
