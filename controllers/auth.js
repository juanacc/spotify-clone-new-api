const {response} = require('express');
const { generateJWT } = require('../helpers/jwt');
const {encryptPassword} = require('../helpers/handleEncryptions');
const User = require('../models/user');
const {save} = require('../services/auth');
const {success, error} = require('../helpers/response');

exports.signup = async (req, res=response) => {
    const {name, email, password, avatar, role} = req.body;

    try {
        const user = new User({ name, email: email.toLowerCase(), password, avatar, role});
        user.password = encryptPassword(password);
        const userDb = await save(user);
        const data = {
            name,
            avatar,
            role    
        };
        const token = generateJWT(userDb.uid);
        res.json(success({data, token}));
    } catch (error) {
        console.log(error);
        res.json(error(500,{
            ok: false,
            msg: 'unexpected error'
        }))
    }
}

exports.login = (req, res=response) => {
    //const {uid} = req.uid;
    const {uid, name, avatar, role} = req;
    try {
        const token = generateJWT(uid);
        const data = {
            name,
            avatar,
            role
        };
        res.json(success({data, token}))
        
    } catch (error) {
        console.log(error);
        res.json(error('500', {
            ok: false,
            msg: 'unexpected error'
        }));
    }
}