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

app.get("/transaksi/awb", checkToken, (req, res) => {
  res.render("contents/transaksi/awb/index");
});

app.get("/transaksi/awb/form", checkToken, (req, res) => {
  res.render("contents/transaksi/awb/form");
});

app.get("/transaksi/awb/form/:id", checkToken, (req, res) => {
  const { id } = req.params;
  res.render("contents/transaksi/awb/form", { id });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
