const proxy = require("http-proxy-middleware");
module.exports = app => {
    app.use(proxy('/mongo/delete/many', { target: "http://localhost:4000/" }));
    app.use(proxy('/mongo/insert/one', { target: "http://localhost:4000/"}));
    app.use(proxy('/mongo/delete/one', { target: "http://localhost:4000/"}));
    app.use(proxy('/mongo/create/collection', { target: "http://localhost:4000/"}));
    app.use(proxy('/mongo/get/collections', { target: "http://localhost:4000/"}));
    app.use(proxy('/mongo/get/databases', { target: "http://localhost:4000/"}));
    app.use(proxy('/mongo/find/all', { target: "http://localhost:4000/"}));
    app.use(proxy('/auth/check', { target: "http://localhost:4000/"}));
};
