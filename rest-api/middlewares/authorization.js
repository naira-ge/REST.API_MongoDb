const { verifyAccessJWT } = require("../helpers/jwt");
const { getJWT, deleteJWT } = require("../helpers/redis");

const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  const decoded = await  jwt.verify(authorization, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
    });

    console.log(decoded, 'decoded');

    if (!decoded) {
      return res.status(403).json({ message: "Forbidden" });
    }

  decoded = userId;
  next();
  
  };

const verify = (req, res, next) => {

  const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
          }
          
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!")
    }
};

module.exports = {
    userAuthorization,
    verify
};