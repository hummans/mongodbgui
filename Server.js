const express = require("express");
var MongoClient = require('mongodb').MongoClient;

const app = express();


app.get('/check/', (req, res) => {
    res.send("Check database");
});

app.get('/insert/', (req, res) => {
    var url = "mongodb+srv://appuser:1234@cluster0-vdt7y.mongodb.net/test?retryWrites=true&w=majority";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("react");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("native").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
