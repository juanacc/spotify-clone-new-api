const {Router} = require('express');
const {check} = require('express-validator');
const {validateEmailInDB} = require('../middlewares/db-validators');
const {validateFields} = require('../middlewares/validate-fields');
const {signup, login} = require('../controllers/auth');
const {isValid} = require('../middlewares/isAValidAuthentication');

const router = Router();

router.post('/signup', 
    [
        check('email', 'The email is required').notEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(validateEmailInDB),
        check('password', 'The password must be more than 6 letters').isLength({ min: 6 }), 
        validateFields
    ],
    signup);

router.post('/login', 
    [
        check('email', 'Email is required').notEmpty(),
        check('password', 'Password is required').notEmpty(),
        validateFields,
        isValid,
    ],
    login);

module.exports = router;