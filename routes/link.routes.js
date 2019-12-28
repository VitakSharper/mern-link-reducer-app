const {Router} = require('express');
const Link = require('../models/Link');
const {protect} = require('../controllers/authController');
const {generate, links, linkById} = require('../controllers/linkController');

const router = Router();

router.post('/generate', protect, generate);
router.get('/', protect, links);
router.get('/detail/:id', protect, linkById);

module.exports = router;
