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
    date:{
        type: Date
    },
    amount: {
        type: String
    },
    expenseID: {
        type: Number
    }
},
{ timestamps: true });

module.exports = mongoose.model('expenses', ExpenseSchema);