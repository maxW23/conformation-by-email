const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
//use static files which may contains all css files and images
const mail = require('./mail');
//read request from the url provided
const server = express();

server.use(express.static('./public'))
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

let code;
server.post('/', (req, res) => {
    code = Math.floor(Math.random() * 903192)
    res.sendFile(path.join(__dirname, 'confirm.html'));
    mail(req.body.email, code)
})

server.post('/confirmEmail', (req, res) => {
    if (req.body.code == code) {
        res.sendFile(path.join(__dirname, 'success.html'))
    } else {
        res.sendFile(path.join(__dirname, 'index.html'))
    }
});

const port = process.env.PORT || 5500
server.listen(port, () => console.log(`Server started on port ${port}`))