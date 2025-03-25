import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body; //키보드 입력
    const users = await selectSql.getUser(); //sql문

    users.map((user) => {
        console.log('ID :', user.UserID);
        console.log('password :', user.Password);
        if (vars.id == user.UserID && vars.password == user.Password) {
            console.log('login success!');
            req.session.user = { ID: user.UserID, checkLogin: true };
        }
       
    });

    if (req.session.user == undefined) {
        console.log('login failed!');
        res.send(`<script>
                    alert('login failed!');
                    location.href='/';
                </script>`)
    } 
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('admin')) {
        res.redirect('/admin');
    }  
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('1')) {
        res.redirect('/EmployeeDoc');
    }
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('2')) {
        res.redirect('/EmployeeNur');
    }
    else if (req.session.user.checkLogin && req.session.user.ID.startsWith('3')) {
        res.redirect('/AccessPat');
    }
});

module.exports = router;
