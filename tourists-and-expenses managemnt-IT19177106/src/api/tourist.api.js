const express = require('express');
const router = express.Router();
const touristsController = require("../controllers/tourist.controller");

module.exports = function(){
router.post('/register', touristsController.register); // handle any file using multer and save before passing controll to the registration controller
router.post('/signin', touristsController.signin);
router.get('/profile/:email', touristsController.getProfile);
router.put('/update-profile/:email', touristsController.updateProfile)

return router
}


