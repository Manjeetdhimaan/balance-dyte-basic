

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const compression = require('compression');

const rtsIndex = require('./routes/routes');
require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT || 3300;
app.use(compression())
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// middleware
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// })
// app.use(cors());
app.use('/api', rtsIndex);
// serving fronted files
app.use(express.static(path.join(__dirname, 'www')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));