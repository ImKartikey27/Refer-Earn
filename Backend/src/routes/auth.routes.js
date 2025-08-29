import {login, register, logout} from "../controllers/auth.controller.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

//unsecured routes
router.route("/login").post(login)
router.route("/register").post(register)

//secured routes
router.route("/logout").post(verifyJWT,logout)


export default router