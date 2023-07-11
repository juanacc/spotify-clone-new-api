const {Router} = require('express');
const {load} = require('../controllers/admin');

const router = Router();

router.post('/load', load);

module.exports = router;