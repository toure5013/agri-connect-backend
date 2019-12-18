// 'use strict'
const cors = require('cors');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/connexion');
var mysql = require('mysql');
var axios = require('axios');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agriconnect'
});


//middleware
var app = express();

//Enabling CORS
// app.use(cors()); 

// Using body parser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


//Routes 
const payementRoutes = require('./routes/payements');
const usersRoute = require('./routes/users');
const permisRoute = require('./routes/permis');



const allowsOrigins = [
    'capacitor://localhost',
    'ionic:localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
]

const corsOptions = {

    origin: (origin, callback) => {
        if (allowsOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Origin not allowed by Cors'));
        }
    }
}

app.options('*', cors(corsOptions))


const public = "./public";

//Static file 
app.use(express.static(public));
// app.use(express.static(publicPathImageProfil));


//Variables
var message = "";
const PORT = process.env.PORT || 8081; // ADD OF PROCESS.ENV.PORT


const baseUrl = '/api/v1/'


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');
    next();
})


//
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


app.get("/api/v1", (req, res)=>{
    console.log("je recois")
    res.send("Bojour") ;
});


//Appeler les routes ici
payementRoutes.payements(app, baseUrl, connection);
usersRoute.users(app, baseUrl, connection);
permisRoute.permis(app, baseUrl, connection);








app.listen(PORT, () => {
    console.log("Application is running on " + PORT);
})