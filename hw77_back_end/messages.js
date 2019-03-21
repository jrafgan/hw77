const express = require('express');
const db = require('../fileDb');
const nanoid = require("nanoid");
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

router.post('/messages', (req, res) => {

    if (req.body.author !== '' && req.body.message !== '') {
        const newMessage = {...req.body, "id": nanoid(), "dateTime": new Date().toISOString()};
        db.addMessage(newMessage);
        res.send(newMessage);
    } else {
        res.status(400).send();
    }
});

module.exports = router;
