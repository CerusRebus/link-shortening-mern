import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import * as dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import linksRoutes from "./routes/links.routes.js"
import redirectRoutes from "./routes/redirect.routes.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5001
const MONGO_DB_URL = process.env.MONGO_DB_URL

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json({extended: true} || undefined))
app.use('/api/auth', authRoutes)
app.use('/api/link', linksRoutes)
app.use('/t', redirectRoutes)

async function start() {
    try {
        await mongoose.connect(MONGO_DB_URL)
            .then(() => console.log('MongoDB was connected'))
            .catch((error) => console.error(`MongoDB connection failed: ${error.message}`))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (error) {
        return console.log('Server Error', error.message)
        process.exit(1)
    }
}

await start()

