const req = require("supertest");
const app = require("../app");
const { v4: uuidv4 } = require("uuid");

describe("Test the root path", () => {
  test("It should responsed the GET method", () => {
    return req(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

let transactionArray = require("../models/transaction");

describe("Test the transactions path", () => {
  let originalTransArray = transactionArray;
  beforeEach(() => {
    transactionArray = originalTransArray;
  });
  describe("GET", () => {
    it("sends the transaction array", async () => {
      const response = await req(app).get("/transactions");

      expect(JSON.parse(response.text)).toEqual(transactionArray);
    });
  });
  describe("POST", () => {
    it("adds new transaction to end of the array", async () => {
      const newLastArrayPosition = transactionArray.length;
      const newTransaction = {
        id: uuidv4(),
        from: "Uber",
        date: "2021-06-15",
        name: "Income",
        amount: 2000,
        notes: "Payday!",
      };

      await new Promise((resolve) => {
        req(app)
          .post(`/transactions`)
          .send(newTransaction)
          .set("Accept", "application/json")
          .expect("headers.location", "/transactions")
          .expect("statusCode", 303)
          .end(resolve);
      });
      expect(transactionArray[newLastArrayPosition]).toEqual(newTransaction);
    });
  });

  describe("/transactions/:id", () => {
    describe("GET", () => {
      it("sends the corresponding transaction when a valid id is given", async () => {
        const response = await req(app).get(
          "/transactions/ac43ed4f-cf1a-42be-b557-7cc624892228"
        );
        const matchingTransaction = transactionArray.find((transaction) => {
          return transaction.id === response.body.id;
        });
        expect(response.body).toEqual(matchingTransaction);
      });

      it("sends a redirect when an invalid id is given", async () => {
        const response = await req(app).get("/transactions/9001");
        expect(response.redirect).toBe(true);
      });
    });

    describe("PUT", () => {
      it("replaces items in a given id in the transactions array", async () => {
        const response = await req(app).get(
          "/transactions/ac43ed4f-cf1a-42be-b557-7cc624892228"
        );
        const updatedTransaction = {
          id: response.body.id,
          from: "Dad",
          date: "2021-06-15",
          name: "Helping out",
          amount: 500,
          notes: "Gift to purchase sofa",
        };
        // const body = response.body
        const editedTransaction = {...response.body, ...updatedTransaction}
        await new Promise((resolve) => {
          req(app)
            .put(`/transactions/${response.body.id}`)
            .send(updatedTransaction)
            .set("Accept", "application/json")
            .expect("headers.location", "/transactions/")
            .expect("statusCode", 303)
            .end(resolve);
        });

        expect(editedTransaction).toEqual(updatedTransaction);
      });
    });
  });
});
