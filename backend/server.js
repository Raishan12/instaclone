import express from "express"
import connection from "./connection.js"
import path from "path"
import url from "url"
import userRoutes from "./routes/insta_route.js"
import env from "dotenv"
import auth from "./middleware/auth.js"

env.config()

const port = 7000
const app = express()

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, "..", "frontend")



app.use(express.json({limit:"100mb"}))

app.use("/api/insta", userRoutes)
app.use(express.static(frontend))

app.get("/signup", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "signup.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})

app.get("/login", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "login.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})

app.get("/profile", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "profile.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})

app.get("/forgot", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "forgot.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})

app.get("/verifyotp", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "otp.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})

app.get("/resetpassword", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "resetpassword.html"))
    } catch (error) {
        res.status(404).send("Page not found")
    }
})


connection().then(() => {
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}).catch((err) => console.log(err))