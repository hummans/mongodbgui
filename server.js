const express = require("express");
var bodyParser = require('body-parser');
var _insert = require('./insert');
var _delete = require('./delete');
var _drop = require('./drop');
var _create = require('./create');
var _update = require('./update');
var _find = require('./find');
var _get = require('./get');
var auth = require('./auth');

var RateLimit = require('express-rate-limit');
//const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://localhost:4000/get/data/firebase?database=asAS&type=1245
app.get('/get/data/:ass', (req, res) => {
    var query = req.query;
    var filter = req.params.ass;
    res.send('user id ' + query.database + query.type + filter);
});

// delete many
//http://localhost:4000/mongo/delete/many
app.post('/:type/delete/many', (req, res) => {
    var type = req.params.type;
    var myObj = {name: "Anna", age: 31, city: type};
    res.send(myObj);
    //_delete.deleteMany(req, res)
});

// delete one
app.post('/delete/one/', (req, res) => {
    _delete.deleteOne(req, res)
});

// drop collection
app.post('/drop/collection/', (req, res) => {
    _drop.dropCollection(req, res)
});

// create collection
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
app.post('/:type/find/all/', (req, res) => {
    _find.findAll(req, res)
});

// find some
app.post('/find/some/', (req, res) => {
    _find.findSome(req, res)
});

// get collections
app.post('/:type/get/collections/', (req, res) => {
    _get.getCollections(req, res)
});

// get databases
app.post('/get/databases/', (req, res) => {
    _get.getDatabases(req, res)
});

// auth
app.post('/auth/check/', (req, res) => {
    auth.check(req, res)
});



var limiter = new RateLimit({
    windowMs: 60*1000, // 1 minute
    max: 15
});

const root = require('path').join(__dirname, 'client', 'build');
app.use(limiter, express.static(root));
app.get("/", (req, res) => {
    res.sendFile('index.html', { root });
});

const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
