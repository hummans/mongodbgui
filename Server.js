const express = require("express");
var MongoClient = require('mongodb').MongoClient;

const app = express();


app.get('/check/', (req, res) => {
    res.send("Check database");
});

app.get('/insert/:username/:password/:cluster/:database/:collection', (req, res) => {
    var username = req.params.username;
    var password = req.params.password;
    var cluster = req.params.cluster;
    var database = req.params.database;
    var collection = req.params.collection;

    // cluster0-vdt7y
    var temp_url = "mongodb+srv://username:password@cluster.mongodb.net/test?retryWrites=true&w=majority";
    var temp_username = temp_url.replace("username", username);
    var temp_password = temp_username.replace("password", password);
    var url = temp_password.replace("cluster", cluster);

    console.log(url);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        var myobj = { name: "Company Inc", address: "Some Random data" };
        return dbo.collection(collection).insertOne(myobj, function(err) {
            if (err)  return res.send("Error " + database + collection + err);
            db.close();
            return res.send("1 document inserted to " + database + collection);
        });
    });
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
