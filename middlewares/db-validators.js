const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const {findById} = require('../services/auth')
const {findTrackById} = require('../services/tracks');
const User = require('../models/user');

exports.validateEmailInDB = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`);
    }
}

exports.isAuthenticate = async (req = request, res = response, next) => {
    //Valida que el usuario este autenticado en la aplicacion
    const {authorization} = req.headers;
    
    const token = authorization.split(' ')[1];
    //console.log(token);
    if(!token)
        return res.status(401).json('There is no token in the request');
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findById(uid);
        if(!user)
            return res.status(401).json(`There is no user with id: ${uid}`);
        req.userEmail = user.email;
        req.role = user.role;
        next();       
    } catch (error) {
        console.log(error);
        res.status(401).json('Invalid token');
    }
}

exports.validatePermisionForAction = async (req = request, res = response, next) => {
    //Valida que el usuario que esta intentando editar/eliminar una receta, sea el propietario de la receta
    const {authorization} = req.headers;
    const token = authorization.split(' ')[1];
    
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        const requestingUser = await findById(uid);
        const {id} = req.params;
        const trackUser = await findTrackById(id);
        if(requestingUser.email !== trackUser.userEmail)
            return res.status(401).json('The user does not have permission to perform the action');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json('Error in the request');
    }
}