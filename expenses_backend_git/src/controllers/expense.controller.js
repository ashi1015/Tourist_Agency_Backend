const Expense = require('../models/expense.model');

//arrow function for create expense
const createExpense = async (req, res) => {
    //check request body
    if (req.body) {
        newExpenseID = 1;
        await Expense.find({}).sort({ expenseID: -1 }).limit(1)
            .then(response => {
                newExpenseID = response[0].expenseID + 1;
            })
            .catch(error => { });
        req.body.expenseID = newExpenseID;
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
    await Expense.find({}).sort({ date: -1 })//.sort({ month: -1 })
        .then(response => {
            res.status(200).send({ data: response });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

//get expenses by type
const getExpensesByType = async (req, res) => {
    await Expense.find({ expenseType: decodeURIComponent(req.params.type) }).sort({ date: -1 })//.sort({ month: -1 })
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

//get expenses details by id
const getOneExpense = async (req, res) => {
    const id = req.params.id;

    await Expense.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "Not found Expense with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: "Error retrieving Expense with id=" + id });
        });
};

//search Expenses between dates
const searchExpenses = async (req, res) => {
    const id = req.params.id;
    var start = req.query.start;
    var end = req.query.end;

    await Expense.find({
        date: {
            $gte: new Date(start.split("-")[0], start.split("-")[1], 1),
            $lt: new Date(end.split("-")[0], end.split("-")[1], 1)
        }
    })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "Not found Expense with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: "Error retrieving Expense with id=" + id });
        });
};


//6-c-c export the function
module.exports = {
    createExpense,
    getAllExpenses,
    getExpensesByType,
    updateExpenseDetails,
    deleteExpense,
    searchExpenses,
    getOneExpense
};