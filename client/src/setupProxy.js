const proxy = require("http-proxy-middleware");
module.exports = app => {
    app.use(proxy('/mongo/delete/many', { target: "http://localhost:4000/" }));
    app.use(proxy('/mongo/get/collections', { target: "http://localhost:4000/"}));
};
