const express = require("express");
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.raw());

app.post('/check/', (req, res) => {
    res.send("username " + req.body.username);
});

app.post('/insert/', (req, res) => {

    validate_request(req);

    var username = req.body.username;
    var password = req.body.password;
    var cluster = req.body.cluster;
    var database = req.body.database;
    var collection = req.body.collection;
    var data = req.body.data;

    console.log(username, password, cluster, database, collection, data);

    // cluster0-vdt7y
    var temp_url = "mongodb+srv://username:password@cluster.mongodb.net/test?retryWrites=true&w=majority";
    var temp_username = temp_url.replace("username", username);
    var temp_password = temp_username.replace("password", password);
    var url = temp_password.replace("cluster", cluster);

    console.log(url, data);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        return dbo.collection(collection).insertOne(data, function(err) {
            if (err)  return res.send("Error " + database + collection + err);
            db.close();
            return res.send("1 document inserted to " + database + collection);
        });
    });
});

validate_request = function (req) {
    for (var item in req.body) {
        if(req.body.hasOwnProperty(item)){
            if(item !== "string") console.log('valid');
        }
    }
};

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
