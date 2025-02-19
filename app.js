const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

app.get("/transaksi/awb/form", (req, res) => {
  res.render("contents/transaksi/awb/form");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
