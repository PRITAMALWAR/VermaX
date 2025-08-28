const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key_here'; // Replace with env variable in production

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      req.user = decoded; // Attach decoded user info to request
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = authorizeRoles;
