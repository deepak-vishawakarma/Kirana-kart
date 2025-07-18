import  Router  from "express"
import {CreateUser,UserLogin} from "../Controllers/UserController.js"

let router = Router()

router.post("/Signup",CreateUser)
router.post('/Login',UserLogin)

export default router