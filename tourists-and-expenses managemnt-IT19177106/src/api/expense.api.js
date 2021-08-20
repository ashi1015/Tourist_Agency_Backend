
const express = require('express');
const router = express.Router();
const controller = require('../controllers/expense.controller');

module.exports = function(){
    router.post('/', controller.createExpense);
    router.get('/view', controller.getAllExpenses);
    router.put('/:id',controller.updateExpenseDetails);
    router.delete('/:id', controller.deleteExpense);
    return router

}
