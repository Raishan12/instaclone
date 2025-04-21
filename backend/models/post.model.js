import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    post: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, required: true }
})


export default mongoose.model.Posts || mongoose.model("Post",postSchema)