const { v4: uuidv4 } = require('uuid');

const trans = [
    {
        id: "ac43ed4f-cf1a-42be-b557-7cc624892228",
        from: "Joshua",
        date: "2021-06-01",
        name: "Rent",
        amount: -700,
        notes: "sucks the life out of me"
    }, 
    {
        id: uuidv4(),
        from: "Dad",
        date: "2021-06-14",
        name: "Best Son",
        amount: 100,
        notes: "The best son"
    }, 
]

module.exports = trans;