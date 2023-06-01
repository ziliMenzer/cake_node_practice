const indexR = require("./index");
const usersR = require("./users");
const countriesR = require("./countries");

exports.routeInit = (app) => {
    app.use("/", indexR);
    app.use("/countries", countriesR);
    app.use("/users", usersR);
}