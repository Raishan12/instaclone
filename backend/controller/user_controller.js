import userSchema from "../models/user.model.js"
import postSchema from "../models/post.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "7eb1543be06e9f",
      pass: "0ba7cb7047c660",
    },
  });

export const signup = async (req, res) => {
    console.log("signup function");

    console.log(req.body);

    const { profilepicture, username, email, phone, password } = req.body
    console.log("add user in controller");
    if (!(profilepicture && username && email && phone && password)) {
        return res.status(404).send({ error: "please fill all fields" })
    }

    bcrypt.hash(password, 10).then(async (hashedpwd) => {
        console.log(hashedpwd)
        const data = await userSchema.create({ profilepicture, username, email, phone, password: hashedpwd })
        res.status(201).send(data)
    })
}


export const login = async (req, res) => {
    console.log("login function");

    const { email, password } = req.body
    try {
        const userExist = await userSchema.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ message: "User not Found" })
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password)

        console.log(isPasswordMatch)

        if (!isPasswordMatch) {
            return res.status(402).json({ message: "Incorrect Password" })
        }

        const token = await jwt.sign({ id: userExist._id }, process.env.JWT_KEY, { expiresIn: "20h" })

        return res.status(200).json({ message: "User successfully Logged", token, user_id: userExist._id })

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const user = async (req, res) => {
    console.log("user function");

    const { id } = req.params
    try {
        const user = await userSchema.findOne({ _id: id })

        if (!user) {
            return res.status(400).json({ message: "User not Found" })
        }

        return res.status(200).json({ message: "User successfully loaded", user })

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const upload = async (req, res) => {
    console.log("upload function");

    console.log(req.body);
    const { user_id } = req.params
    const { post, description } = req.body
    console.log(req.body)
    console.log({ post, description, user_id })

    try {
        if (!(post && description && user_id)) {
            return res.status(404).send({ error: "please fill all fields" })
        }
        const data = await postSchema.create({ post, description, user_id })
        res.status(201).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error, message: "Internal server error" })
    }
}

export const loadposts = async (req, res) => {
    try {
        const data = await postSchema.find()
            .populate('user_id', 'username profilepicture')
            .sort({ date: -1 })
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const loaduserposts = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const data = await postSchema.find({ user_id: id })
            .populate('user_id')
            .sort({ date: -1 });
            console.log(data)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error });
    }
};

export async function generateotp(req,res){
    const {email} = req.body
    try{
      const user = await userSchema.findOne({email})
      
      if(!user)
        return res.status(404).json({message:"Email not Found"})
      
      let otp = Math.floor(Math.random()*900000)+100000
      user.otp = otp
      console.log(email)
      console.log(user.otp)

      await user.save();

      const info = await transporter.sendMail({
        from: 'muhammedraishan12@gmail.com', // sender address
        to: email, // list of receivers
        subject: "OTP verification", // Subject line
        text: "otp", // plain text body
        html: `<p>Dear <b>${user.username}</b>, Your OTP is <b>${otp}</b> for reset your instagram password</p>`, // html body
      });
    console.log("sss")
      console.log("Message sent: %s", info.messageId);
    
      res.status(200).json({message:"OTP send successfully"})
      
    }
  
    catch(error){
      console.log(error)
      res.status(500).json({message:error})
    }
  
  }

  export async function verifyotp(req,res){
    const {email,otp} = req.body
    try{
      const user = await userSchema.findOne({email})
      
      if(!user)
        return res.status(404).json({message:"Email not Found"})
      console.log( {email,otp})
      console.log(parseInt(otp));
      if(user.otp===parseInt(otp)){
        res.status(200).json({message:"OTP verified Successfully"})
      }else{
        return res.status(401).json({message:"Incorrect OTP"})
      }
    }
  
    catch(err){
      console.log(err)
      res.status(500).json({message:err})
    }
  }

  export async function resetpass(req,res){
    const {email,password} = req.body

    try{
      const user = await userSchema.findOne({email})
      
      if(!user)
        return res.status(404).json({message:"Email not Found"})
  
      bcrypt.hash(password,10).then(async (hashed_pwd)=>{
        user.password = hashed_pwd
        user.otp = null
        await user.save()
        res.status(200).json({message:"Password reset Successfully"})
    })
  
    }catch(error){
      console.log(error)
      res.status(500).json({message:error})
    }
  }
  
  export const update = async (req, res)=> {
    const id = req.params.id
    const { profilepicture, username, email, phone } = req.body;
    try {
      const data = await userSchema.findByIdAndUpdate(
        id,
        { profilepicture, username, email, phone },
        { new: true } 
      );
  
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({message:"Data Updated Successfully"});
  
    } 
    
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" }); 
    }
  };

  export const deleteacc = async (req, res)=>{
    const { id } = req.params
    console.log(id)
    try {
      const post_delete = await postSchema.deleteMany({ user_id: id })
      const user_delete = await userSchema.findByIdAndDelete(id);
  
      if (!user_delete) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };