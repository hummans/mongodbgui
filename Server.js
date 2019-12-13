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

// insert row
app.post('/insert/', (req, res) => {
   var auth = Object.entries(req.body);

    var url = "mongodb+srv://username:password@cluster.mongodb.net/test?retryWrites=true&w=majority";
    var replace = {
        username:auth[0][1],
        password:auth[1][1],
        cluster:auth[2][1]
    };

    url =  url.replace(/username|password|cluster/gi, function(matched){
        return replace[matched];
    });

    try{
        MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
            if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
            var dbo = db.db(auth[3][1]);
            return dbo.collection(auth[4][1]).insertOne(auth[5][1], function(err) {
                if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                db.close();
                return res.send('{"status":"ok"}');
            });
        });
    } catch (e) {
        return  res.send('{"status":"error", "desc":'+ e + '}');
    }
});



const API_PORT = process.env.PORT || 4000;
app.listen(API_PORT, () => console.log(`PORT ${API_PORT}`));
