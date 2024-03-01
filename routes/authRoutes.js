const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authController');
const middleware = require('../middlewares/authMiddleware');

router.post('/register', controllers.registerUser);
router.post('/login', controllers.loginUser);
router.get('/protected', middleware.verifyToken, controllers.checkToken);

module.exports = router;
