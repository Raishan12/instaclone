import pkg from "jsonwebtoken"
<<<<<<< HEAD
import userSchema from "../models/user.model.js"
const { verify } = pkg

export default async function auth(req, res, next) {
    console.log("auth middleware")
    const key = req.headers.authorization

    if (!key)
        return res.status(400).send("unauthorized access")

    const token = key.split(" ")[1]
    try {
        const decoded = await verify(token, process.env.JWT_KEY)
        const user = await userSchema.findById(decoded.id)

        if (!user) {
            return res.status(401).send("User not found")
        }

        req.user = user
        next();
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
=======
const { verify } = pkg
export default async function auth(req,res,next){
    console.log("auth middleware");
    console.log(req.headers.authorization);
    
    const key = req.headers.authorization

    console.log(key);

    console.log(process.env.JWT_KEY);
    
    if(!key)
        return res.status(400).redirect("http://localhost:7000/login")
    const token = key.split(" ")[1]
    
    const auth = await verify(token,process.env.JWT_KEY)
    console.log(auth)
    req.user=auth.id
    next()
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663
}