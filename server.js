import express from "express"
import config from "config"
import mongoose from "mongoose"
import * as path from "path"

import authRoutes from "./routes/auth.routes.js"
import linksRoutes from "./routes/links.routes.js"
import redirectRoutes from "./routes/redirect.routes.js"

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', authRoutes)
app.use('/api/link', linksRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5001

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
            .then(() => console.log('MongoDB was connected'))
            .catch((error) => console.error(`MongoDB connection failed: ${error.message}`))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (error) {
        return console.log('Server Error', error.message)
        process.exit(1)
    }
}

await start()

