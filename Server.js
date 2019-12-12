const express = require("express");
const assert = require('assert');
const path = require('path');
const http = require("http");
var MongoClient = require('mongodb').MongoClient;

const app = express();

app.get('/test/', (req, res) => {
    res.send("Testing");
});

app.get('/database/', (req, res) => {
    var url = "mongodb://localhost:27017/mydb";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        res.send("Database created!");
        db.close();
    });
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
