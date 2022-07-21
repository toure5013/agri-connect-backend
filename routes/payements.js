var axios = require('axios')
exports.payements = function (app, baseUrl, connection) {

    // INSERT INTO `payement`(`reference`, `phone`, `amount`, `date`, `user_id`) VALUES ()

    app.get(baseUrl + 'payement/:phone', (req, res) => {
        
        let phone = req.params.phone;
        const data = [phone];
        try{

            const query = "SELECT * FROM `payement` WHERE phone = ?";

            connection.query(query,data, function (error, results, fields) {
            if (error) throw error;
            else {
                console.log(results);
                var message = {
                    name: 'Ajout d\'un nouevau payement' ,
                    status: 'success',
                    status: 200,
                    message: "Ajout effecture avec succès",
                    payement : results
                }
                res.json(message);
            }   
          });
        }catch(e) {

        }
    });

    var sms = async  (telephone)=>{
        await axios.post('http://badev.lorbouor.org/api/v1/sms',{
                "email": "2019@civagrihack.ci",
                "password": "2019civagrihack",
                "cellphone": telephone,
                "message_content": "Young African Tech: Vous venez d'enregistrer un paiement sur l'application mobile agri-connect. Nous analyserons afin de valider votre paiement. Merci pour votre confiance!"            });
}       

    app.post(baseUrl + 'payement', (req, res) => {
        var axios = require('axios');
        try {
            console.log(req.body)

                const reference = req.body.reference;
                const phone = req.body.phone;
                sms(phone);
                const amount = req.body.amount;
                const date =  req.body.date;
                const user_id = req.body['user_id'];
                const data = [
                    reference,
                    phone,
                    amount,
                    date,
                    user_id
                ];
    
           
    
            const query = "INSERT INTO `payement`(`reference`, `phone`, `amount`, `date`, `user_id`) VALUES (?,?,?,?,?)";

            connection.query(query,data, function (error, results, fields) {
                if (error) {
                    var message = {
                        name: 'Ajout d\'un nouevau payement' ,
                        status: 'failed',
                        status: 404,
                        message: "Ajout effecture avec echoué"
                    }
                    res.json(message);
                }
                else {
                    console.log(results);
                    var message = {
                        name: 'Ajout d\'un nouevau payement' ,
                        status: 'success',
                        status: 200,
                        message: "Ajout effecture avec succès"
                    }
                    res.json(message);
                }   
              }); 
    
        } catch (e) {
            console.log(e);
            message = {
                name: 'Error',
                status: 'failed',
                status: 404,
                message: "ERREUR " + JSON.stringify(e)
            }
            res.json(message);
        }
    });



    app.get('payements', (req, res) => {


        res.json({
            id: 1,
            payement: "Voici la liste de tout les payements"
        });

    });


}