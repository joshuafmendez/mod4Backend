const transactions = require("express").Router();
const transactionArray = require("../models/transaction.js");

// CREATE
transactions.post("/", (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

// DELETE
transactions.delete("/:indexArray", (req, res) => {
  const deletedBookmark = transactionArray.splice(req.params.indexArray, 1);
  res.status(200).json(deletedBookmark);
});

// UPDATE
transactions.put("/:arrayIndex", (req, res) => {
  transactionArray[req.params.arrayIndex] = req.body;
  res.status(200).json(transactionArray[req.params.arrayIndex]);
});

transactions.get("/:arrayIndex", (req, res) => {
  if (transactionArray[req.params.arrayIndex]) {
    res.json(transactionArray[req.params.arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

transactions.get("/", (req, res) => {
  res.json(transactionArray);
});

transactions.post("/", (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

module.exports = transactions;