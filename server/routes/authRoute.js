import express from "express"
import { loginController, registerController } from "../controllers/authController.js"
// import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/register").post(registerController)
router.route("/login").post( loginController)

export default router