import express from "express"
import { login, signup } from "../controller/user_controller.js"
<<<<<<< HEAD
import auth from "../middleware/auth.js"
import { loadpost } from "../controller/post_controller.js"

=======
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663


const instaRoutes = express.Router()

instaRoutes.post("/signup",signup)
instaRoutes.post("/login",login)
<<<<<<< HEAD
instaRoutes.get("/posts", auth, loadpost);

=======
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663

export default instaRoutes