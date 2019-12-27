var MongoClient = require('mongodb').MongoClient;
module.exports = {
    getCollections: function (req, res) {
        var url = req.body.url;
        var database = req.body.database;
        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
                if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
                var dbo = db.db(database);
                return dbo.listCollections().toArray(function(err, obj) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send(obj);
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    },
    getDatabases: function (req, res) {
        var url = req.body.url;
        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
                if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
                var dbo = db.db('test').admin();
                return dbo.listDatabases(function(err, obj) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send(obj);
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    }
};
