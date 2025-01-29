const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Authentication
router.post('/login', userController.userLogin);

// Registration
router.post('/', userController.registerUser);




module.exports = router;
