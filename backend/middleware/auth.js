var jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user;
      //console.log(req.user)
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


module.exports=authenticateJWT