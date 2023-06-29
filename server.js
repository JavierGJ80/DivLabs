const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

var app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

const cloudFunctions = require("./server/routers/cloudFuncs");

app.use("/cloudFunctions", cloudFunctions);

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT_SERVER || 8080, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT_SERVER || 8080}`
  );
});

module.exports = app;
