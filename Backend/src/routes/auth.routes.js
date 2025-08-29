import {login} from "../controllers/auth.controller.js"
import { Router } from "express"

const router = Router()

//unsecured routes
router.route("/login").post(login)

export default router