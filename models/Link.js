import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    data: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: mongoose.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Link', LinkSchema)