const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

app.get("/transaksi/awb", (req, res) => {
  res.render("contents/transaksi/awb/index");
});

app.get("/transaksi/awb/form", (req, res) => {
  res.render("contents/transaksi/awb/form");
});

app.get("/master/groupcustomer", (req, res) => {
  res.render("contents/master/groupcustomer");
});

app.get("/master/customer", (req, res) => {
  res.render("contents/master/customer");
});

app.get("/master/service", (req, res) => {
  res.render("contents/master/service");
});

app.get("/master/payment", (req, res) => {
  res.render("contents/master/payment");
});

app.get("/master/package", (req, res) => {
  res.render("contents/master/package");
});

app.get("/master/tlc", (req, res) => {
  res.render("contents/master/tlc");
});

app.get("/master/customer", (req, res) => {
  res.render("contents/master/customer");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
