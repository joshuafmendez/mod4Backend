const express = require("express");
const cors = require('cors');

const app = express();
const transactions = require("./controllers/transactionController");
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  next();
});

// /transactions
app.use("/transactions", transactions);

// ROOT
app.get("/", (req, res) => {
  res.send("Basic Express App - ROOT");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
