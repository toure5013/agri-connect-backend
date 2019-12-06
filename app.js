// 'use strict'
const cors = require('cors');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');



//middleware
var app = express();

//Enabling CORS
// app.use(cors()); 

// Using body parser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded



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




//Variables
var message = "";
const PORT = process.env.PORT || 8081; // ADD OF PROCESS.ENV.PORT


const baseUrl = '/api/v1/'


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');
    next();
})


app.get(baseUrl, function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    var message = {
        name: 'Accueil',
        status: 200,
        message: "<h1>Bonjour bienvenue sur l'api V1 d'Agriconnect </h1>",
    };
    res.json(message);
});

/*******************************************CONFIGURE ROUTES*********************************************** */


app.post(baseUrl + 'user', (req, res) => {
    var fichier = "./files/users.json"
    if (req.body) {
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var telephone = req.body.telephone;
        var password = req.body.password;
        var passwordConfirm = req.body.passwordConfirm;
        if (
            nom !== undefined && nom !== "" &&
            prenom !== undefined && prenom !== "" &&
            telephone !== undefined && telephone !== "" &&
            password !== undefined && password !== "" &&
            passwordConfirm !== undefined && passwordConfirm !== "") {
            console.log("sa marche");
            fs.readFile(fichier, function (erreur, fichier) {
                var data = JSON.parse(fichier);
                users = data.users;
                let id = users.length + 1;
                let user = {
                    "id": id,
                    "nom": nom,
                    "prenom": prenom,
                    "telephone": telephone,
                    "password": password
                }
                users.push(user);
                var newData = {
                    "users": users
                }

                newData = JSON.stringify(newData)
                fs.writeFileSync('./files/users.json', newData);
                message = {
                    name: 'success',
                    status: 'success',
                    status: 200,
                    message: "Utilisateurs ajoutés avec succès"
                }
                res.send(message);

            });

        } else {
            console.log("donner manquant");
            message = {
                name: 'Error',
                status: 'failed',
                status: 404,
                message: "Des donner sont manquants"
            }
            res.json(message);

        }
    } else {
        message = {
            name: 'Error',
            status: 'success',
            status: 404,
            message: "ERREUR " + JSON.stringify(e)
        }
        res.json(message);
    }
});




app.get(baseUrl + 'user', function (req, res) {
    try {
        var fichier = 'files/users.json';
        var data = fs.readFileSync(fichier);
        var data = JSON.parse(data);
        var users = data.users;
         //erreur de mot de passe
         var message = {
            name: 'Get all users',
            status: 'success',
            status: 200,
            message: users,
        };
        res.json(message);
    }catch(e){
         //erreur de mot de passe
         var message = {
            name: 'Error',
            status: 'failed',
            status: 404,
            message: "erreur de mot de passe",
            login: false
        };
        res.json(message);
    }
}
);


app.post(baseUrl + 'connexion', function (req, res) {
    try {
        var fichier = 'files/users.json';
        var data = fs.readFileSync(fichier);
        var data = JSON.parse(data);
        var users = data.users;
        console.log(users);
            // console.log(data);
        for (let i = 0; i < users.length; i++) {
                if (req.body.telephone == users[i].telephone) {
                    if (req.body.password == users[i].password) {
                        //password ok
                        //connecter
                        var message = {
                            name: 'success',
                            status: 'success',
                            status: 200,
                            message: "connecter avec succès",
                            login: true,
                            user : users[i]
                        };
                         res.json(message);
                    } else {
                        //erreur de mot de passe
                        var message = {
                            name: 'Error',
                            status: 'failed',
                            status: 404,
                            message: "erreur de mot de passe",
                            login: false
                        };
                        res.json(message);
                    }
                } else {
                    //user nexiste pas
                    message = {
                        name: 'Error',
                        status: 'failed',
                        status: 404,
                        message: "Utilisateur n'existe pas"
                    }
                    res.json(message);
                }
            } //end for

    } catch (e) {
        message = {
            name: 'Error',
            status: 'failed',
            status: 404,
            message: "ERREUR " + JSON.stringify(e)
        }
        res.json(message);
    }

});



/*******************************************CONFIGURE ROUTES*********************************************** */


app.post(baseUrl + 'permis/demande', (req, res) => {
    var fichier = "./files/demande.json"
    if (req.body) {
        var localite = req.body.localite;
        var telephone = req.body.telephone;
        var progression = 0;
        var id_user = 1
        if (
            localite !== undefined && localite !== "") {
            console.log("sa marche");
            fs.readFile(fichier, function (erreur, fichier) {
                var data = JSON.parse(fichier);
                demandes = data.permis;
                let id = demandes.length + 1;
                let demandePermis = {
                    "id": id,
                    "telephone": telephone,
                    "date": new Date(),
                    "progression": progression,
                    "id_user": id_user
                }
                demandes.push(demandePermis);
                var newData = {
                    "permis": demandes
                }

                newData = JSON.stringify(newData)
                fs.writeFileSync('./files/demande.json', newData);
                message = {
                    name: 'Demande titre foncier',
                    status: 'success',
                    status: 200,
                    message: "Demande envoyé avex succès"
                }
                res.json(message);

            });

        } else {
            console.log("donner manquant");
            message = {
                name: 'Error',
                status: 'failed',
                status: 404,
                message: "Des donner sont manquants"
            }
            res.json(message);
        }
    } else {
        message = {
            name: 'Error',
            status: 'failed',
            status: 404,
            message: "ERREUR " + JSON.stringify(e)
        }
        res.json(message);
    }
});




app.get(baseUrl + 'permis', (req, res) => {
    var fichier = "./files/demande.json"
    fs.readFile(fichier, function (erreur, fichier) {
        var data = JSON.parse(fichier);
        message = {
            name: 'Les titres foncier',
            status: 'success',
            status: 200,
            message: data
        }
    });
    res.send(message);
});



app.get(baseUrl + 'permis/:id', async (req, res) => {
    var fichier = "./files/demande.json"
    let id = req.params.id;
    var data = fs.readFileSync(fichier);
    
    if(data){
        var data = JSON.parse(data);
        var permis = data.permis;
        var dataReturn = '';
        for(let i =0; i<permis.length; i++){

            console.log(dataReturn);
            if (permis[i]['id_user'] == id) {
                 dataReturn = permis[i];
            }

            if (dataReturn) {
                message = {
                    name: 'Un titre foncier',
                    status: 'success',
                    status: 200,
                    message: dataReturn
                };
            } else {
                message = {
                    name: 'Innexistant',
                    status: 400,
                    message: dataReturn
                }
            }
        }
    }
    res.send(message);  
});


app.listen(PORT, () => {
    console.log("Application is running on " + PORT);
})