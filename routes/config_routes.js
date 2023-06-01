const indexR = require("./index");
const usersR = require("./users");
const countriesR = require("./countries");
const cakesR = require("./cakes");

exports.routeInit = (app) => {
    app.use("/", indexR);
    app.use("/countries", countriesR);
    app.use("/users", usersR);
    app.use("/cakes", cakesR);
}