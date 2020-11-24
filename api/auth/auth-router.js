const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../user/user-model');

const uniqueUsername = require('../middleware/unique-username');
const usernameExists = require('../middleware/username-exists');

const secret = process.env.SECRET || 'the secret';

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', uniqueUsername, async (req, res) => {
  /*
    IMPLEMENT

    You are encouraged to build additional middlewares to take care of the endpoint's functionality.

    1- On SUCCESSFUL registration, the response body should look like the following example:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    2- On FAILED registration due to the username being taken,
      the response body should include a string exactly as follows: "username taken".

    3- On FAILED registration due to username or password missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
  */
  try {
    const { username, password } = req.body;
    const newUser = await User.insert({
      username,
      password: bcrypt.hashSync(password, 8),
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', usernameExists, async (req, res) => {
  // Implement
  try {
    const { body: { password }, user } = req;
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ message: `welcome, ${user.username}`, token: generateToken(user) });
    } else {
      res.status(401).json({ message: 'incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
