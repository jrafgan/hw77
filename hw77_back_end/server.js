const express = require('express');
const db = require('./fileDb');
const messages = require('./app/messages');
const cors = require('cors');
const app = express();
const port = 3005;

db.init();

app.use(cors());
app.use(express.json());

app.use('/', messages);

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
});