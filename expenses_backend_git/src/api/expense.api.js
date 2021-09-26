
const express = require('express');
const router = express.Router();
const controller = require('../controllers/expense.controller');

module.exports = function(){
    router.post('/', controller.createExpense);
    router.get('/view', controller.getAllExpenses);
    router.get('/type/:type', controller.getExpensesByType);
    router.put('/update-expenses/:id',controller.updateExpenseDetails);
    router.delete('/delete-expense/:id', controller.deleteExpense);
    router.get('/get-expense/:id',controller.getOneExpense);
    router.get('/search-expenses/date/',controller.searchExpenses);
    return router

}

