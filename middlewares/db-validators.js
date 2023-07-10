const {request, response} = require('express');
const User = require('../models/user');

exports.validateEmailInDB = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`);
    }
}