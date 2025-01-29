const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const customerController = require('../controllers/customerController')


router.post('/:userId', verifyJWT, customerController.createCustomer)

router.get('/customer/:customerId', verifyJWT, customerController.getCustomer)

router.get('/:userId', verifyJWT, customerController.getAllCustomers)



module.exports = router;
