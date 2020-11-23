const User = require('../user/user-model');

module.exports = async function (req, res, next) {
  const { username } = req.body;
  const user = await User.getByUsername(username);

  if (user) {
    res.status(400).json({ message: 'this username already exists in the db' });
  } else {
    next();
  }
}