var axios = require('axios');
var sms = async  (telephone)=>{
   await axios.post('http://badev.lorbouor.org/api/v1/sms',{
        "email": "2019@civagrihack.ci",
        "password": "2019civagrihack",
        "cellphone": telephone,
        "message_content": "Young African Tech: Vous venez d'entamer le processus d'obtention de titre foncier sur notre application. Votre demande été bien été reçu."
    });
}

exports.permis =  (app, baseUrl, connection)=> {

    /*******************************************CONFIGURE ROUTES*********************************************** */
    app.post(baseUrl + 'permis/demande', (req, res) => {
        console.log('marche')

     
        if (req.body) {
            console.log(req.body);

            var localite = req.body.localite;
            var telephone = req.body.telephone;
            var document1 = req.body.document1;
            var document2 = req.body.document2;
            var progression = 2;
            var id_user = 1;
            var step = 2;
            var coast = 10000;

          var response =   sms(telephone);

            if (
                localite !== undefined && localite !== ""
            ) {


                //Requete vers la base : 
                var data = [
                    step,
                    coast,
                    id_user,
                    document1,
                    document2,
                    progression,
                    new Date()
                ];

                const query = "INSERT INTO `titre_foncier`( `step`, `caost`, `id_user`, `document1`, `document2`, `progression`,  `date`) VALUES (?,?,?,?,?,?,?)";
                connection.query(query, data, function (error, results, fields) {
                    if (error) throw error;
                    else {
                        var message = {
                            name: 'Demande titre foncier',
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
                status: 'failed',
                status: 404,
                message: "ERREUR " + JSON.stringify(e)
            }

            res.json(message);
        }
    });




    app.get(baseUrl + 'permis', (req, res) => {
        var data = JSON.parse(fichier);
        message = {
            name: 'Les titres foncier',
            status: 'success',
            status: 200,
            message: data
        }
        res.send(message);
    });



    app.get(baseUrl + 'permis/:id', async (req, res) => {
        let id = req.params.id;

        if (data) {
            const query = "SELECT * FROM `titre_foncier` WHERE id = ?"
            const data = [id]
            connection.query(query, data, function (error, results, fields) {
                if (error) {
                    var message = {
                        name: 'Innexistant',
                        status: 400,
                        message: dataReturn
                    }
                    res.json(message);
                } else {
                    var message = {
                        name: 'Un titre foncier',
                        status: 'success',
                        status: 200,
                        message: dataReturn
                    };
                    res.json(message);
                }
            });
        }
    });
}
