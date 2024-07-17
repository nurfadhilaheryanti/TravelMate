const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    
    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(' ')[1];
    
    if (!access_token) throw { name: "Unauthorized"};

    const payload = verifyToken(access_token);
    
    const user = await User.findOne({
      where: { email: payload.email }
    });
    
    if (!user) throw { name: 'Unauthorized'};

    req.loginInfo = { 
      id: user.id,
      email: user.email,
    };
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authentication;
