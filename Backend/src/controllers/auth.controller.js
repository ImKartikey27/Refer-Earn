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

    const option = {
        httpOnly: true
    }

    user.refreshToken = token 
    await user.save()

    const response = new ApiResponse(200, {token} , "Login successful")
    return res
            .status(200)
            .cookie("token", token, option)
            .json(response)
})

const register = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new ApiError(400 , "All fields are required")
    }

    const userExists = await User.findOne({email})

    if(userExists){
        throw new ApiError(400 , "User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const tokenData = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(
        tokenData,
        process.env.TOKEN_SECRET,
        {expiresIn: "28d"}
    )

    const option = {
        httpOnly: true
    }

    user.refreshToken = token
    await user.save()

    const response = new ApiResponse(200, {token} , "Registration successful")
    res
    .status(200)
    .cookie("token", token, option)
    .json(response)
})

const logout = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
        throw new ApiError(404 , "User not found")
    }
    user.refreshToken = null
    await user.save()

    res.clearCookie("token")

    const response = new ApiResponse(200, {} , "Logout successful")
    res.status(200).json(response)
})

export {
    login,
    register,
    logout
}