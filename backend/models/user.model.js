import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    profilepicture:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true}
})

export default mongoose.model.Users || mongoose.model("User",userSchema)