import express from 'express';
import { selectSql, updateSql, insertSql, deleteSql } from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('3')) {
        const Reservation = await selectSql.getReservation();
        res.render('AccessPat', {
            title: "Reservation",
            Reservation,
        });
    } 
    else {
        res.redirect('/');
    }
});


router.get('/insertReservation', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('3')) {
        res.render('insertReservation', {
            data: " "
        });
    }
    else {
        res.redirect('/');
    }
})

router.post('/insertReservation', async (req, res) => {
    const vars = req.body;
    console.log(vars);

    const data = {
        Reservation_number: vars.Reservation_number,
        Reservation_Date_Time: vars.Reservation_Date_Time,
        Medical_Specialty_Department_ID: vars.Medical_Specialty_Department_ID,
        Patient_Patient_ID: vars.Patient_Patient_ID,
    };
    await insertSql.setReservation(data);

    res.redirect('/AccessPat');
})


router.get('/deleteReservation', async (_req, res) => {
    if (_req.session.user == undefined) {
        res.redirect('/');
    } 
    else if (_req.session.user.checkLogin && _req.session.user.ID.startsWith('3')) {

        const Reservation_res = await selectSql.getReservation();
        res.render('deleteReservation', {
            title: "Delete 'Reservation' table",
            Reservation_res,
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteReservation', async (req, res) => {
    console.log("delete :", req.body.delBtn);
    const data = {
        Reservation_number: req.body.delBtn,
    };

    await deleteSql.deleteReservation(data);

    res.redirect('/AccessPat');
});

module.exports = router;

