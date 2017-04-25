const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

const berlin = require('controllers/api/berlin');

router.get('/berliners', bearerAuth, berlin.list);

module.exports = router;
