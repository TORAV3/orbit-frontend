const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkToken } = require("./middlewares/checkToken");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("contents/login");
});

app.get("/transaksi/hawb", checkToken, (req, res) => {
  res.render("contents/transaksi/awb/index");
});

app.get("/tracking", (req, res) => {
  res.render("contents/tracking/index");
});

app.get("/transaksi/hawb/form", checkToken, (req, res) => {
  res.render("contents/transaksi/awb/form");
});

app.get("/transaksi/hawb/form/:id", checkToken, (req, res) => {
  const { id } = req.params;
  res.render("contents/transaksi/awb/form", { id });
});

app.get("/transaksi/manifest", checkToken, (req, res) => {
  res.render("contents/transaksi/manifest/index");
});

app.get("/transaksi/manifest/form", checkToken, (req, res) => {
  res.render("contents/transaksi/manifest/form");
});

app.get("/transaksi/manifest/form/:id", checkToken, (req, res) => {
  const { id } = req.params;
  res.render("contents/transaksi/manifest/form", { id });
});

app.get("/transaksi/checkpoint", (req, res) => {
  res.render("contents/transaksi/checkpoint");
});

app.get("/master/groupcustomer", checkToken, (req, res) => {
  res.render("contents/master/groupcustomer");
});

app.get("/master/customer", checkToken, (req, res) => {
  res.render("contents/master/customer");
});

app.get("/master/service", checkToken, (req, res) => {
  res.render("contents/master/service");
});

app.get("/master/payment", checkToken, (req, res) => {
  res.render("contents/master/payment");
});

app.get("/master/package", checkToken, (req, res) => {
  res.render("contents/master/package");
});

app.get("/master/tlc", checkToken, (req, res) => {
  res.render("contents/master/tlc");
});

app.get("/master/customer", checkToken, (req, res) => {
  res.render("contents/master/customer");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
