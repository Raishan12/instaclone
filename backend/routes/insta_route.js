import express from "express"
import { login, signup } from "../controller/user_controller.js"
import auth from "../middleware/auth.js"
import { loadpost } from "../controller/post_controller.js"



const instaRoutes = express.Router()

instaRoutes.post("/signup",signup)
instaRoutes.post("/login",login)
instaRoutes.get("/posts", auth, loadpost);


export default instaRoutes