const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 8000
require('dotenv').config()

const app = express()

// const database = require('./database');

app.post('/login', (req, res, next) => {
    let user_email = request.body.user_email;
    let user_password = request.body.user_password;
    if(user_email && user_password){
        query = `
        SELECT * FROM user
        WHERE email = ${user_email}
        `;
        database.query(query, (err, data) => {
            if(data.length > 0){
                for(let count = 0; count < data.length; count++){
                    if(data[count].user_password == user_password){
                        request.session.user_id = data[count].user_id;
                        res.send("Connexion with success");
                    }
                    else{
                        res.send("Incorrect Password");
                    }
                    res.end();
                }
            }else{
                res.send("Incorrect Email Address");
            }
            res.end();
        });
    }else{
        res.send('Enter a Email and Password correct');
    }
    res.end();
});

app.get('/logout', (req, res, next) => {
    req.session.destroy();
});

app.listen(port, () => console.log(`Server listening on port:${port}`));
