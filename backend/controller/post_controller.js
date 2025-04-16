import postSchema from "../models/post.model.js";

export const loadpost = async (req, res) => {
    try {
        const data = await postSchema.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
}

