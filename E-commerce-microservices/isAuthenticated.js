const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
            jwt.verify(token, "okijuhygtfgyhujiuhygtf", (err, data) => {
                if (err) {
                    return res.status(400).json({ message: "unable to decrypt" })
                }
                if (data) {
                    req.user = data;
                    next();
                }
            })
        } else {
            return res.status(400).json({ message: "Tocken not found" })
        }
    } catch (error) {
        return res.status(400).json({ message: "unable to authentication" })
    }
}



