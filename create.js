var MongoClient = require('mongodb').MongoClient;
module.exports = {
    createCollection: function (req, res) {
        var url = req.body.url;
        var database = req.body.database;
        var collection = req.body.collection;

        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
                if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
                var dbo = db.db(database);
                return dbo.createCollection(collection, function(err) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send('{"status":"ok", "desc": "collection created"}');
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    }
};
