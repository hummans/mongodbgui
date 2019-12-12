const express = require("express");
var MongoClient = require('mongodb').MongoClient;

const app = express();


app.get('/check/', (req, res) => {
    res.send("Check database");
});

app.get('/insert/:database', (req, res) => {
    var database = req.params.database;
    var url = "mongodb+srv://appuser:1234@cluster0-vdt7y.mongodb.net/test?retryWrites=true&w=majority";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        var myobj = { name: "Company Inc", address: "Some Random data" };
        return dbo.collection("native").insertOne(myobj, function(err) {
            if (err)  return res.send("Error " + database + err);
            db.close();
            return res.send("1 document inserted to " + database);
        });
    });
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
