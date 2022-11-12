import {Router} from "express"
import shortid from "shortid"
import Link from "../models/Link.js"
import auth from "../middleware/auth.middleware.js"
import * as dotenv from "dotenv"

dotenv.config()

const BASE_URL = process.env.BASE_URL

const router = Router()

// Generate
// http://localhost:5000/api/link/generate
router.post('/generate', auth, async (req, res) => {
    try {
        const {from} = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if (existing) return res.status(200).json({success: true, link: existing})
        const to = `${BASE_URL}` + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()

        return res.status(201).json({success: true, link})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
    }
})

// Get All links
// http://localhost:5000/api/link/
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        return res.status(200).json({success: true, links})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Links not found'})
    }
})

// Get Link By Id
// http://localhost:5000/api/link/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        return res.status(200).json({success: true, link})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
    }
})
export default router