const {request, response} = require('express');
const { generateJWT } = require('../helpers/jwt');
const {encryptPassword} = require('../helpers/handleEncryptions');
const User = require('../models/user');
const {save, findByIdAndUpdate, find} = require('../services/auth');
const {success, error} = require('../helpers/response');

exports.signup = async (req, res=response) => {
    const {name, email, password, avatar, role} = req.body;

    try {
        const user = new User({ name, email: email.toLowerCase(), password, avatar, role});
        user.password = encryptPassword(password);
        const userDb = await save(user);
        
        const data = {
            name,
            avatar: userDb.avatar,
            role: userDb.role    
        };
        const tokenSession = await generateJWT(userDb.uid);
        
        return res.json(success({data, tokenSession}));
    } catch (error) {
        console.log(error);
        res.json(error(500,{
            ok: false,
            msg: 'unexpected error'
        }))
    }
}

exports.login = async (req, res=response) => {
    const {user} = req;
    //console.log('ENTRE', user)
    try {
        const tokenSession = await generateJWT(user._id);
    
        const data = {
            name: user.name,
            avatar: user.avatar,
            role: user.role
        };
        
        return res.status(200).json({data, tokenSession});
        
    } catch (err) {
        console.log(err);
        res.json(error('500', {
            ok: false,
            msg: 'unexpected error'
        }));
    }
}

exports.changeRole = async (req = request, res = response) => {
    const {role} = req.body;
    const userEmail = req.userEmail;
    //console.log(role, userEmail)
    try {
        const user = await find(userEmail);
        //console.log('USUARIO', user);
        const userUpdated = {
            role
        };
        await findByIdAndUpdate(user._id, userUpdated);
        res.status(200).json({msg: 'Update role ok'});
    } catch (err) {
        console.log(err);
        res.json(error('500', {
            ok: false,
            msg: 'unexpected error'
        }));
    }
}