import express from "express"
import connection from "./connection.js"
import path from "path"
import url from "url"
import userRoutes from "./routes/insta_route.js"

const port = 7000
const app = express()

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, "..", "frontend")

app.use(express.static(frontend))
app.use(express.json({limit:"15mb"}))


app.use("/api/insta", userRoutes)


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


connection().then(() => {
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}).catch((err) => console.log(err))