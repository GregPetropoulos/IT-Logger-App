// * Middelware Checking to see if token is correct and in the header
const jwt = require('jsonwebtoken');

const secret = process.env.MY_JWT_SECRET;

module.exports = function (req, res, next) {
  //* Checking for token in header after tech made a login attempt
  const token = req.header('x-auth-token');

  // * Check, if no token send a message
  if (!token) {
    return res.status(400).json({ msg: 'No Token, Authorization denied' });
  }
  try {
    //* if there is a token, verify the current token
    const decoded = jwt.verify(token, secret);

    // * once verified, the payload placed in decoded and has the tech.id. To gain access to the id inside the route I must assign it to req.tech to get the id out of payload
    req.tech = decoded.tech;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
