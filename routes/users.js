exports.users = function (app, baseUrl, connection) {

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

        console.log(req.body)
        if (req.body) {
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var phone = req.body.telephone;
            var password = req.body.password;
            var passwordConfirm = req.body.passwordConfirm;
            function randomString(len, charSet) {
                charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var randomString = '';
                for (var i = 0; i < len; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomString += charSet.substring(randomPoz,randomPoz+1);
                }
                return randomString;
            }
            let r  = randomString(10, 'PICKCHARSFROMTHISSETlmlsshjhhgauyzgvbqvdbqhgsqdk');
            var ref_id_payement = r;
            var role = 0;

            if (
                firstname !== undefined && firstname !== "" &&
                lastname !== undefined && lastname !== "" &&
                phone !== undefined && phone !== "" &&
                password !== undefined && password !== "" &&
                passwordConfirm !== undefined && passwordConfirm !== "") {
                console.log("sa marche");

                // `id_user`, `fistname`, `lastname`, `phone`, `password`, `ref_id_payement`, `role`


                const data = [
                    firstname,
                    lastname,
                    phone,
                    password,
                    ref_id_payement,
                    role
                ];

                const query = "INSERT INTO `users`( `fistname`, `lastname`, `phone`, `password`, `ref_id_payement`, `role`) VALUES (?,?,?,?,?,?)";
                connection.query(query, data, function (error, results, fields) {
                    if (error) throw error;
                    else {
                        // console.log(results);
                        var message = {
                            name: 'Insertion d\'un utilisateur',
                            status: 'success',
                            status: 200,
                            message: "Demande envoyé avex succès"
                        }
                        res.json(message);
                    }
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




    app.get(baseUrl + 'users', function (req, res) {
        try {

            const query = "SELECT * FROM `users`";
            connection.query(query, function (error, results, fields) {
                if (error) throw error;

                else {
                    console.logs(results);
                    var message = {
                        name: 'Demande titre foncier',
                        status: 'success',
                        status: 200,
                        message: "Demande envoyé avex succès"
                    }
                    res.json(message);
                }
            });


        } catch (e) {
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
    });

}