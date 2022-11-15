import {Router} from "express"
import bcrypt from "bcryptjs"
import {check, validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import User from "../models/User.js"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const router = Router()

// Register
// http://localhost:5000/api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email.').isEmail(),
        check('password', 'Minimum password length 6 characters.').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                    message: errors.array().map(error => error.msg).join('<br>')
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) return res.status(400).json({success: false, message: 'This user already exists'})

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()

            return res.status(201).json({success: true, message: 'User created'})
        } catch (error) {
            return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
        }
    })

// Login
// http://localhost:5000/api/auth/login
router.post('/login',
    [
        check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                    message: 'Incorrect login details'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) return req.status(400).json({success: false, message: 'User is not found'})

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({success: false, message: 'Wrong password, please try again'})

            const token = jwt.sign({userId: user.id}, JWT_SECRET)

            return res.status(200).json({success: true, message: 'You are logged into your account', token, userId: user.id})
        } catch (error) {
            return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
        }
    })

export default router