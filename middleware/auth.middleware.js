import jwt from "jsonwebtoken"
import config from "config"

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) return res.status(401).json({success: false, message: 'No authorization'})

        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: 'No authorization'})
    }
}

export default authMiddleware