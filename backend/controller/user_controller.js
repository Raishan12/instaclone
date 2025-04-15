import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
        const { profilepicture, username, email, phone, password } = req.body
        console.log(req.body);
       console.log("add user in controller");
       if (!(profilepicture && username && email && phone && password)) {
            return res.status(404).send({ error: "please fill all fields" })
        }

        bcrypt.hash(password,10).then(async(hashedpwd)=>{
            console.log(hashedpwd)
            const data = await userSchema.create({ profilepicture, username, email, phone, password:hashedpwd })
            res.status(201).send(data)
        })
}


export const login = async (req, res) => {
    const { email, password} = req.body
    try {
        const userExist = await userSchema.findOne({ email })

        if(!userExist) {
            return res.status(400).json({message: "User not Found"})
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password)

        console.log(isPasswordMatch)

        if(!isPasswordMatch){
            return res.status(402).json({message: "Incorrect Password"})
        }

        const token = await jwt.sign({ id: userExist._id }, process.env.JWT_KEY, { expiresIn: "10s" })

        return res.status(200).json({ message: "User successfully Logged",token})
                                                                                                                                                                                        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}