const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require("nanoid");
const config = require('../config');
const db = require('../fileDb');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});
const router = express.Router();


router.get('/messages', (req, res) => {

    const date = req.query.dateTime;
    if (Object.keys(req.query).length !== 0) {
        const date2 = new Date(req.query.dateTime);

        if (isNaN(date2.getDate()) || req.query.dateTime === '') {
            res.status(400).send();

        } else {
            const arr = db.get30Messages();
            const arr2 = arr.filter(item => item.dateTime > date);
            res.send(arr2);
        }

    } else {
        res.send(db.get30Messages());
    }
});

router.post('/messages', upload.single('image'), (req, res) => {

    if (req.body.message !== '') {
        let newMessage = {...req.body, "id": nanoid(), "dateTime": new Date().toISOString()};
        if (req.body.author === '') {
            newMessage.author = 'Anonymous';
        }
        if (req.file) {
            newMessage.image = req.file.filename;
        }

        db.addMessage(newMessage);
        res.send(newMessage);
    } else {
        res.status(400).send();
    }
});

module.exports = router;
