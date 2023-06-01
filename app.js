const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const {routeInit} = require("./routes/config_routes");

require("./db/mongoconnect");

const app = express();

// נותן גישה לכל הדומיינים לגשת לשרת שלנו
app.use(cors());
// כדי שנוכל לקבל באדי
app.use(express.json());
// הגדרת תקיית הפאבליק כתקייה ראשית
app.use(express.static(path.join(__dirname,"public")))

routeInit(app);

const server = http.createServer(app);
console.log("env",process.env.TEST,process.env.USER_DB);

let port = process.env.PORT || 3000
server.listen(port);