import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/apiResponse.js"
import ApiError from "../utils/apiError.js"
import User from "../models/User.model.js"

//register user 
//login user 

const login = asyncHandler(async(req , res) => {
    const {email , password} = req.body
    if(!email || !password){
        throw new ApiError(400 , "All fields are required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404 , "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new ApiError(400 , "Invalid credentials")
    }

    const tokenData = {
        id : user._id,
        email : user.email, 
        role: user.role
    }

    const token = jwt.sign(
        tokenData,
        process.env.TOKEN_SECRET,
        {expiresIn: "28d"}
    )

    const response = new ApiResponse(200, {token} , "Login successful")
    res.status(200).json(response)
})

export {
    login
}