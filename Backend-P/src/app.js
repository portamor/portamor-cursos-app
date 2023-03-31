const express      = require('express');
const cookieParser = require('cookie-parser');
const morgan       = require('morgan')
const session      = require('express-session');
const cors         = require('cors');
const router       = require('./routes/index')
require("dotenv").config();
require('./database.js')

const server = express()

server.use(cors())

server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json({ limit: "50mb" })(req, res, next);
  }
});
server.use(express.text());
server.use(cookieParser());

server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, ContentType, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
  server.use("/", router);

  // Error catching endware.
server.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err,'aqio');
    res.status(status).send(message);
  });


module.exports = server