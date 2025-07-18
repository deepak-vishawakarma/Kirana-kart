import  Router  from "express"
import {CreateAdminUser,AdminLogin} from "../Controllers/AdminUserController.js"

let router = Router()

router.post("/Signup",CreateAdminUser)
router.post('/Login',AdminLogin)

export default router