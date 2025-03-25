import express from 'express';
import { selectSql, updateSql, insertSql, deleteSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('admin')) {
        const Doctor = await selectSql.getDoctor();
        const Nurse = await selectSql.getNurse();
        res.render('admin', {
            title: "Doctor",
            Doctor,
            title2: "Nurse",
            Nurse,
        });
    } 
    else {
        res.redirect('/');
    }
});


router.get('/updateDoctor', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        const Doctor_res = await selectSql.getDoctor();
        console.log(Doctor_res)
        res.render('updateDoctor', {
            main_title: "UPDATE 'Doctor' table",
            Doctor_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/updateDoctor', async (req, res) => {
    const vars = req.body;
    const data = {
        Doctor_ID: vars.Doctor_ID,
        Password: vars.Password,
        Name: vars.Name,
        Address: vars.Address,
        Phone_number: vars.Phone_number,
        Medical_Specialty_Department_ID: vars.Medical_Specialty_Department_ID,
    }
    await updateSql.updateDoctor(data);

    res.redirect('/admin');
})


router.get('/insertDoctor', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        res.render('insertDoctor', {
            data: " "
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/insertDoctor', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Doctor_ID: vars.Doctor_ID,
        Password: vars.Password,
        Name: vars.Name,
        Address: vars.Address,
        Phone_number: vars.Phone_number,
        Medical_Specialty_Department_ID: vars.Medical_Specialty_Department_ID,
    };
    await insertSql.setDoctor(data);

    res.redirect('/admin');
})


router.get('/deleteDoctor', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        const Doctor_res = await selectSql.getDoctor();
        res.render('deleteDoctor', {
            title: "Delete 'Doctor' table",
            Doctor_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteDoctor', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Doctor_ID: req.body.delBtn,
    };

    await deleteSql.deleteDoctor(data);

    res.redirect('/admin');
});



//여기서부터는 Nurse
router.get('/updateNurse', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        const Nurse_res = await selectSql.getNurse();
        console.log(Nurse_res)
        res.render('updateNurse', {
            main_title: "UPDATE 'Nurser' table",
            Nurse_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/updateNurse', async (req, res) => {
    const vars = req.body;
    const data = {
        Nurse_ID: vars.Nurse_ID,
        Password: vars.Password,
        Name: vars.Name,
        Address: vars.Address,
        Phone_number: vars.Phone_number,
        Medical_Specialty_Department_ID: vars.Medical_Specialty_Department_ID,
    }
    await updateSql.updateNurse(data);

    res.redirect('/admin');
})


router.get('/insertNurse', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        res.render('insertNurse', {
            data: " "
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/insertNurse', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Nurse_ID: vars.Nurse_ID,
        Password: vars.Password,
        Name: vars.Name,
        Address: vars.Address,
        Phone_number: vars.Phone_number,
        Medical_Specialty_Department_ID: vars.Medical_Specialty_Department_ID,
    };
    await insertSql.setNurse(data);

    res.redirect('/admin');
})


router.get('/deleteNurse', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('admin')) {
        const Nurse_res = await selectSql.getNurse();
        res.render('deleteNurse', {
            title: "Delete 'Nurse' table",
            Nurse_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteNurse', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Nurse_ID: req.body.delBtn,
    };

    await deleteSql.deleteNurse(data);

    res.redirect('/admin');
});

module.exports = router;

