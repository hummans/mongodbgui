var MongoClient = require('mongodb').MongoClient;

module.exports = {
    signup: function (req, res) {
        var auth = Object.entries(req.body);
        var myobj = { username: auth[0][1], password: auth[1][1], create: new Date() };
        var url = "mongodb+srv://root:1234@cluster0-cgtwf.mongodb.net/test?retryWrites=true&w=majority";
        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
                if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
                var dbo = db.db('data');
                return dbo.collection('users').insertOne(myobj, function(err, obj) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send('{"status":"ok", "desc":"' + obj.result.n + ' user created"}');
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    },
    signin: function (req, res) {
        var auth = Object.entries(req.body);
        var myobj = { username: auth[0][1], password: auth[1][1], login: new Date() };
        var url = "mongodb+srv://root:1234@cluster0-cgtwf.mongodb.net/test?retryWrites=true&w=majority";
        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
                if (err) return  res.send('{"status":"error", "desc":'+ err + '}');
                var dbo = db.db('data');
                return dbo.collection('users').insertOne(myobj, function(err, obj) {
                    if (err)  return  res.send('{"status":"error", "desc":'+ err + '}');
                    db.close();
                    return res.send('{"status":"ok", "desc":"' + obj.result.n + ' user created"}');
                });
            });
        } catch (e) {
            return  res.send('{"status":"error", "desc":'+ e + '}');
        }
    }
};
