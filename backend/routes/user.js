import { Router } from "express";
import {userSignUp, userSignIn, userDetailsUpdate, userBulk} from '../controllers/user.js'
import { authMiddleWare } from "../middleware/userAuthMiddleware.js";
const router = Router()

router.post('/signUp', userSignUp);
router.post('/signIn', userSignIn);
router.put('/updateUserDetails', authMiddleWare, userDetailsUpdate)
router.put('/bulk', authMiddleWare, userBulk)


export default router