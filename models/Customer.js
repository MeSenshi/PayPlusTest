const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
             match: [/^05\d([-]{0,1})\d{7}$/, 'is invalid']
        },

        email: {
            type: String,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            required: true,
            unique: true
        },
        birthdate: {
            type: String,
        },
        //user that the customer belong to
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

customerSchema.plugin(uniqueValidator);

customerSchema.methods.toCustomerResponse = function () {

    return {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        birthdate: this.birthdate
    }
}


module.exports = mongoose.model('Customer', customerSchema);
