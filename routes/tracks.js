const {Router} = require('express');
const {check} = require('express-validator');
const {isAuthenticate, validatePermisionForAction} = require('../middlewares/db-validators');
const {validateFields} = require('../middlewares/validate-fields');
const {getAll, addTrack, deleteTrack, editTrack, getSearch} = require('../controllers/tracks');

const router = Router();

router.get('/', isAuthenticate, getAll);
router.get('/:search', isAuthenticate, getSearch);
router.post('/add', 
    [
        isAuthenticate,
        check('name', 'The track name is required').notEmpty(),
        check('album', 'The track album is required').notEmpty(),
        check('cover', 'The track cover is required').notEmpty(),
        check('artist', 'The track artist is required').notEmpty(),         
        validateFields
    ], 
    addTrack);
router.delete('/delete/:id', [isAuthenticate, validatePermisionForAction], deleteTrack);
router.put('/edit/:id', [isAuthenticate, validatePermisionForAction], editTrack);

module.exports = router;