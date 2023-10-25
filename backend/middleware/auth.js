const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    let reqtoken = req.headers.authorization;
    let token = reqtoken.split(" ")[1]; // taking token from the given sentence using split methods

    // need to verify the token
    let Verifiedtoken = await jwt.verify(token, process.env.JWTSECRET);
    if (!Verifiedtoken) {
      res.status(404).send("UnauthorizedUser");
    } else {
      // if everything is ok then go to next controllers
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = authMiddleware;
