import pkg from "jsonwebtoken"
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
}