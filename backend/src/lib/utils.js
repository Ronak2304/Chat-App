import jwt from 'jsonwebtoken'

const generateToken = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    }) // userId-> payload, secret_key->signature, header->token ka meta data

    res.cookies("jwtToken",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return token
}

export default generateToken