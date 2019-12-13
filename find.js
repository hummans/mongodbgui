var MongoClient = require('mongodb').MongoClient;
module.exports = {
    findOne: function (req, res) {
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
                return dbo.collection(auth[4][1]).findOne(auth[5][1], function(err, result) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send(result);
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    },
    findAll: function (req, res) {
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
                return dbo.collection(auth[4][1]).find({}).toArray (function(err, result) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send(result);
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    },
    findSome: function (req, res) {
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
                console.log(auth[5][1]);
                console.log({projection:auth[5][1]});
                return dbo.collection(auth[4][1]).find({}, {projection:auth[5]}).toArray (function(err, result) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send(result);
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    }
};
