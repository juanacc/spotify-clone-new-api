const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateEmailInDB = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`);
    }
    next();
}

module.exports = {
    validateEmailInDB
}