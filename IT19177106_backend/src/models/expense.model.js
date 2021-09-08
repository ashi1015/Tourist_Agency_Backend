const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ExpenseSchema = new mongoose.Schema({
    expenseType: {
        type: String
    },
    year: {
        type: String
    },
    month: {
        type: String
    },
    amount: {
        type: String
    }
},
{ timestamps: true });

module.exports = mongoose.model('expenses', ExpenseSchema);