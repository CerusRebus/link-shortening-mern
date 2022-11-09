import {Router} from "express"
import Link from "../models/Link.js"

const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})

        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        return res.status(404).json({success: false, message: 'Link not found'})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Something went wrong, please try again'})
    }
})

export default router