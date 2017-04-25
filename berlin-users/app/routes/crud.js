const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

const user = require('controllers/api/user');

router.get('/users/:userId', bearerAuth, user.detail);

module.exports = router;
