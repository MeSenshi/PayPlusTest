const Customer = require('../models/Customer');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');


// @desc registration for a customer
// @route POST /customers
// @required fields {fullName, email, phoneNumber}
// @return Customer
const createCustomer = asyncHandler(async (req, res) => {

    const id = req.userId;

    const userId = await User.findById(id).exec();

    const {fullName, email, phoneNumber, birthdate} = req.body.customer;

    // confirm data
    if (!fullName || !email || !phoneNumber) {
        res.status(400).json({message: "All fields are required"});
    }

    const createdCustomer = await Customer.create({fullName, email, phoneNumber, birthdate, userId});


    return await res.status(200).json({
        customer: createdCustomer.toCustomerResponse()
    })

});


const getAllCustomers = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const customers = await Customer.find({userId: userId}).exec()

    if (!customers) {
        res.status(204).json({message: "no customers found"})
    }

    return await res.status(200).json({
        customers
    })
})

const getCustomer = asyncHandler(async (req, res) => {
    const customerId = req.params.customerId


    const customer = await Customer.findById(customerId).exec()

    if (!customer) {
        res.status(204).json({message: "not found customer with this is"})
    }

    return await res.status(200).json({
        customer: customer
    })
})

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomer
}


