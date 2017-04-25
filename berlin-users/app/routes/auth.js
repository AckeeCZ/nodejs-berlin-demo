const user = require('controllers/api/user');

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

router.post('/register', user.register);

module.exports = router;
