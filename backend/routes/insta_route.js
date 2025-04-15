import express from "express"
import { login, signup } from "../controller/user_controller.js"


const instaRoutes = express.Router()

instaRoutes.post("/signup",signup)
instaRoutes.post("/login",login)

export default instaRoutes