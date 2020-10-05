const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.get('/', (req, res) => {

    res.send(`Welcome to Transmilenio's MERN project`);
});

const PORT = 8080;

app.listen(PORT,() => {

    console.log(`Server run in port ${PORT}`);
});