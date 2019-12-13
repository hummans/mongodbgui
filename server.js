const express = require("express");
var bodyParser = require('body-parser');
var _insert = require('./insert');
var _delete = require('./delete');
var _drop = require('./drop');
var _create = require('./create');
var _update = require('./update');
var _find = require('./find');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/delete/many/', (req, res) => {
    _delete.deleteMany(req, res)
});

app.post('/delete/one/', (req, res) => {
    _delete.deleteOne(req, res)
});

app.post('/drop/collection/', (req, res) => {
    _drop.dropCollection(req, res)
});

app.post('/create/collection/', (req, res) => {
    _create.createCollection(req, res)
});

// insert row
app.post('/insert/one/', (req, res) => {
   _insert.insertOne(req, res)
});

// insert many
app.post('/insert/many/', (req, res) => {
    _insert.insertMany(req, res)
});

// update row
app.post('/update/one/', (req, res) => {
    _update.updateOne(req, res)
});

// update many
app.post('/update/many/', (req, res) => {
    _update.updateMany(req, res)
});

// find row
app.post('/find/one/', (req, res) => {
    _find.findOne(req, res)
});

// find all
app.post('/find/all/', (req, res) => {
    _find.findAll(req, res)
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
