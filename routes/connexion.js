

exports.connexion = function(app, baseUrl ,  connection) {

app.post(baseUrl + 'connexion', function (req, res) {
    // `id_user`, `fistname`, `lastname`, `phone`, `password`, `ref_id_payement`, `role`
    try {
        if(req.body){
            const phone = req.body.telephone;
            const password = req.body.password;
        }

        const data = [
            phone,
            password
        ];

        const query = "SELECT * FROM `users` WHERE telephone = ? && phone = ?";
            connection.query(query,data, function (error, results, fields) {
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
        message = {
            name: 'Error',
            status: 'failed',
            status: 404,
            message: "ERREUR " + JSON.stringify(e)
        }
        res.json(message);
    }

});

}