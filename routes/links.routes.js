import {Router} from "express"
import shortid from "shortid"
import * as dotenv from "dotenv"

import auth from "../middleware/auth.middleware.js"

import Link from "../models/Link.js"
import User from "../models/User.js"

dotenv.config()

const REMOTE_URL = process.env.REMOTE_URL
// const LOCAL_URL = process.env.LOCAL_URL

const router = Router()

// Generate Link
// http://localhost:5000/api/link/generate
router.post('/generate', auth, async ({body: {from, userId}}, res) => {
    try {
        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if (existing) return res.status(200).json({success: true, link: existing})
        const to = REMOTE_URL + '/t/' + code
        const link = new Link({
            code, to, from, owner: userId
        })
        await link.save()
        await User.findByIdAndUpdate(userId, {
            $push: {links: link}
        })
        return res.status(201).json({success: true, message: 'Link generated successfully', link})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
    }
})

// Remove Link
// http://localhost:5000/api/link/
router.delete('/', auth, async ({body: {id, userId}}, res) => {
    try {
        const link = await Link.findByIdAndDelete(id)
        if (!link) return res.status(400).json({success: false, message: 'Link not found.'})
        await User.findByIdAndUpdate(userId, {
            $pull: {links: id}
        })
        return res.status(200).json({success: true, message: 'Link has been removed.'})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Link has not been removed.'})
    }
})

// Get All links
// http://localhost:5000/api/link/
router.get('/', auth, async ({user: {userId}}, res) => {
    try {
        const links = await Link.find({owner: userId})
        return !links["length"] ? res.status(200).json({success: false, message: 'Links not created yet'})
            : res.status(200).json({success: true, links})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Links not found.'})
    }
})

// Get Link By Id
// http://localhost:5000/api/link/:id
router.get('/:id', auth, async ({params: {id}}, res) => {
    try {
        const link = await Link.findById(id)
        return !link ? res.status(400).json({success: false, message: 'Link not found.'}) :
            res.status(200).json({success: true, link})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Link not found.'})
    }
})
export default router