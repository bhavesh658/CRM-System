const jwt = require("jsonwebtoken");

module.exports.protect = (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token) return res.status(401).json("No token");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch(err){
        res.status(401).json({ message: "Invalid token" });
    }
};


module.exports.isManager = (req, res, next) => {
  try {
    const role = req.headers.role;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required"
      });
    }

    if (role !== "manager" && role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    req.user = { role };

    next(); 

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};