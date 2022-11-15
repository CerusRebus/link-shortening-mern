import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) return res.status(401).json({success: false, message: 'No authorization'})

        req.user = jwt.verify(token, `${JWT_SECRET}`)
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: 'No authorization'})
    }
}

export default authMiddleware