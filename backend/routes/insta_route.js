import express from "express"
import { deleteacc, generateotp, loadposts, loaduserposts, login, resetpass, signup, update, upload, user, verifyotp } from "../controller/user_controller.js"
import auth from "../middleware/auth.js"



const instaRoutes = express.Router()

instaRoutes.post("/signup",signup)
instaRoutes.post("/login",login)
instaRoutes.get("/user/:id",user)
instaRoutes.post("/upload/:user_id", upload)
instaRoutes.get("/loadposts",auth, loadposts)
instaRoutes.get("/loaduserposts/:id", auth, loaduserposts)
instaRoutes.post("/generateotp", generateotp)
instaRoutes.post("/verifyotp", verifyotp)
instaRoutes.post("/resetpass", resetpass)
instaRoutes.post("/update/:id", update)
instaRoutes.get("/delete/:id", deleteacc)


export default instaRoutes