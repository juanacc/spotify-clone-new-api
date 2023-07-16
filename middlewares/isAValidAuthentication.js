const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const {find} = require('../services/auth');
const {success, error} = require('../helpers/response');

exports.isValid = async (req = request, res = response, next) => {
    const {email, password} = req.body;

    const user = await find(email);

    if(!user){
        console.log('NO EXISTE USUARIO', email)
        return res.json(error(400, {
            message: 'LOGIN ERROR'
        }));
    }
    
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if(!isValidPassword){
        console.log('PASSWORD ERRONEO')
        return res.json(error(400, {
            message: 'LOGIN ERROR'
        }));
    }
    req.user = user;
    next();
}

exports.isAdmin = (req = request, res = response, next) => {
    const role = req.role;
    role == 'admin' ? next() : res.json(error(400, {message: 'ACTION NOT ALLOWED'})); 
}