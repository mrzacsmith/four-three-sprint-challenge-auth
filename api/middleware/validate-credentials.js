module.exports = function (req, res, next) {
  if (
    !req.body.username ||
    !req.body.password ||
    (typeof req.body.username !== 'string') ||
    (typeof req.body.password !== 'string') ||
    (req.body.username.length < 3) ||
    (req.body.password.length < 3)
  ) {
    res.status(400).json({ message: 'username and password are required and must be 3 chars or longer' });
  } else {
    next();
  }
}
