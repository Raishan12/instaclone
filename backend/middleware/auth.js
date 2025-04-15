import pkg from "jsonwebtoken"
const { verify } = pkg
export default async function auth(req,res,next){
    console.log("auth middleware");
    console.log(req.headers.authorization);
    
    const key = req.headers.authorization

    console.log(key);

    console.log(process.env.JWT_KEY);
    
    if(!key)
        return res.status(400).send("unauthorized access")
    const token = key.split(" ")[1]
    
    const auth = await verify(token,process.env.JWT_KEY)
    console.log(auth)
    req.user=auth.id
    next()
}