const jwt = require('jsonwebtoken');
module.exports.isAuth = (req, res, next) => {

    //get the token
  const token = req.cookies.token;
  //check if it exists
  if (!token) {
    res.redirect("/login");
  } else {
    //token exists, verify its signerature is correct
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

};
