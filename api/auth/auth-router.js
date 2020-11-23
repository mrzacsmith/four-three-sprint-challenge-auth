const router = require('express').Router();

const validateCredentials = require('../middleware/validate-credentials');
const uniqueUsername = require('../middleware/unique-username');

router.post('/register', validateCredentials, uniqueUsername, (req, res) => {
  // implement registration
});

router.post('/login', validateCredentials, (req, res) => {
  // implement login
});

module.exports = router;
