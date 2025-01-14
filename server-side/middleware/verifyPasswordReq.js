const jwt = require("jsonwebtoken")
/**
 * @func verifyPasswordReq
 * @desc Middleware to verify password change token and accordingly modify the request body.
 * @requires jwt - to verify the token.
 */
const verifyPasswordReq = (req, res, next) => {
    // Get the token from the PASSWORD cookie and verify it.
    const token = req.cookies.PASSWORD;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Password change token not found. Please try again.",
        });
    }

    jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired password change token.",
            });
        }
        else if(decoded.purpose == "Verify User"){
            // Add email to the request body.
            req.body.email = decoded.email;
            next();
        }
        else if(decoded.purpose == "Password Change"){
            // Add email and purpose to the request body.
            req.body.passwordChangeToken = decoded; // decoded contains jwt payload.
            next();
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid password change token. Please try again.",
            });
        
        }
    });
};

module.exports = verifyPasswordReq;