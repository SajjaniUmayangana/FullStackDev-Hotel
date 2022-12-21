const jsonwebtoken = require("jsonwebtoken");
const errorCreated = require("./error");

// verify the authentication
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // check if token is valid
  if (!token) {
    return next(errorCreated.errorCreated(401, "You are not authenticated"));
    // res.status(401)
    // .send({ message: err.message || "You are not authenticated" });
  }

  jsonwebtoken.verify(token, process.env.jwtSecretKey, (err, user) => {
    if (err)
      return next(errorCreated.errorCreated(403, "Your token is invalid"));
    // res.status(403)
    //  .send({ message: err.message || "Your token is not valid" });
    req.user = user;
    next();
  });
};

// verify the user (the user of the admin can delelte the account)
exports.verifyUser = (req, res, next) => {

   this.verifyToken(req,res, ()=> {
    if (req.user.id == req.params.id || req.user.isAdmin){
        next()
    }else{
        return next(errorCreated.errorCreated(403,"You are not authorized"))
    }

   })
}
