const Expense = require('../models/expense.model');

//arrow function for create expense
const createExpense = async (req, res) => {
    //check request body
    if (req.body) {
        // console.log(expenseType);
        const expense = new Expense(req.body); //create object for get data from the front end
        await expense.save() //save this data
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

//View all expenses
const getAllExpenses = async (req, res) => {
    await Expense.find({}).sort({year: -1}).sort({month: -1})
        .then(response => {
            res.status(200).send({ data: response });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

//update Expense details
const updateExpenseDetails = async (req, res) => {
    var id = req.params.id
    await Expense.findOneAndUpdate({ _id: id }, req.body)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

//delete Expense
const deleteExpense = async (req, res) => {
    var id = req.params.id
    await Expense.findOneAndDelete({ _id: id }, req.body)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


//6-c-c export the function
module.exports = {
    createExpense,
    getAllExpenses,
    updateExpenseDetails,
    deleteExpense
};