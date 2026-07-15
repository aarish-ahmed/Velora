import jwt from 'jsonwebtoken'
const authMiddleware = async (req, res,next) => {
   try {
     const token=req.cookies.Token
    if(!token){
        return res.status(400).json({
            message:'Please login first'
        })
    }
    const userData=jwt.verify(token,process.env.JWT_SECRET)

    req.user=userData
    console.log(req.user)
    next()
   } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal Server Error",
    });
   }

};
export default authMiddleware