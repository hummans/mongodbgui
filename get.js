var MongoClient = require('mongodb').MongoClient;
module.exports = {
    getCollections: function (req, res) {
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
