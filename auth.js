var MongoClient = require('mongodb').MongoClient;

module.exports = {
    check: function (req, res) {
        var url = req.body.url;
        console.log(req.body);
        try{
            MongoClient.connect(url, {useUnifiedTopology: true}, function(err, connect) {
                if (err) {
                    var error = {status:'error', error:err};
                    return res.send(error);
                }
                else{
                    var ok = {status:'ok'};
                    return res.send(ok);
                }
            });
        } catch (err) {
            var error = {status:'ok', error:err};
            return res.send(error);
        }
    }
};
