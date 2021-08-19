const express = require('express');
const app = express.Router();
const Students = require('../models/Students');
const genID = require('../utils/genID');

app.get('/', (req, res)=>{
    res.render('index', { 
        title: 'iStudent',
        // script: 'script'
    });
});

app.post('/', (req, res)=>{
    const { username, password } = req.body;

    if(username === 'lecturer' && password === 'lecturer2021'){
        return res.redirect('/method');
    }

    res.render('index', { error: 'Incorrect Details' });
});

app.get('/method', (req, res)=>{
    res.render('verify-method', {
        title: 'Choose Verification Methods'
    });
});

app.get('/qr-scanner', (req, res)=> {
    res.render('qr-scanner', {
        title: 'Scan QR Code'
    });
});

app.get('/student/insert', async(req, res)=> {
    res.render('student-create', {
        title: 'Student create'
    });
});

app.get('/student/:confirmID', async(req, res)=> {
    let confirmID = req.params.confirmID.replace(/\:\/\'\"\-\[\]\&/ig,'');
    let student = await Students.findOne({ confirmID });

    if(!student){
        res.redirect('/no-student-found');
        return;
    }

    console.log(student);
    res.render('student', {
        title: 'Student Found',
        confirmID: student.confirmID,
        regNo: student.regNo,
        fullname: student.fullname,
        dept: student.dept,
        level: student.level,
        rrr: student.rrr,
        fees: student.fees,
    });
});

app.post('/student/insert', async(req, res)=>{
    let confirmID = genID(7);
    async function unique(){
        let c = await Students.findOne({confirmID});
        console.log(c);
        if(c){
            unique();
            return;
        }
        await Students.create({confirmID,...req.body});
        res.redirect(`/qr-code/${confirmID}`)
    }

    unique();
});

app.patch('/student/update', async(req, res)=>{
    const { regNo } = req.query;
    const { fullname } = req.body;

    await Students.findOneAndUpdate({ regNo }, {$set: {
        fullname, 
    }});

    res.json({
        status: 'success',
        msg: `Student ${regNo}: has been updated`
    })
});

app.get('/student/*', (req, res)=> {
    res.redirect('/no-student-found');
});

app.get('/qr-code/:confirmID', async(req, res)=>{
    let confirmID = req.params.confirmID;
    let student = await Students.findOne({ confirmID });

    if(!student){
        res.redirect('/no-student-found');
        return;
    }

    console.log(student);
    res.render('qr-code', {
        title: 'Student Found',
        confirmID: student.confirmID,
        fullname: student.fullname,
        regNo: student.regNo,
    });
});

app.get('/no-student-found', (req, res)=>{
    res.render('no-student', {
        title: 'Student Not Found'
    });
});

module.exports = app;