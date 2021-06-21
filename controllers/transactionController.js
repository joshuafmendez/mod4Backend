const transactions = require("express").Router();
let transactionArray = require("../models/transaction.js");

// CREATE
transactions.post("/", (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

// DELETE
transactions.delete("/:transactionID", (req, res) => {
  const matchingTransaction = transactionArray.find((transaction) => {
    return transaction.id === req.params.transactionID;
  });
  const deletedTransaction = transactionArray.splice(matchingTransaction, 1);
  res.status(200).json(transactionArray);
});

// UPDATE
transactions.put("/:transactionID", (req, res) => {
  const matchingTransaction = transactionArray.map((transaction) => {
    if(transaction.id === req.params.transactionID){
      return {...transaction, ...req.body}
    }
    return transaction;
  });
  transactionArray = matchingTransaction;
  res.status(200).json({transactions: matchingTransaction, message: "success"});
});

transactions.get("/:transactionID", (req, res) => {
  const matchingTransaction = transactionArray.find((transaction) => {
    return transaction.id === req.params.transactionID;
  });
  if (matchingTransaction) {
    res.json(matchingTransaction);
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

