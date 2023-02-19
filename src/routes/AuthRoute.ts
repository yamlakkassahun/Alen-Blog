import express from 'express'
import { Login, SignupBlogger, SignupUser } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', Login);
router.post('/register/blogger', SignupBlogger);
router.post('/register/user', SignupUser);

export { router as AuthRouter };
