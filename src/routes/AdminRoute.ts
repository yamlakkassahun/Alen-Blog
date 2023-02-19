import express from 'express'
import { allBloggers, allUsers, Ban } from '../controllers';
import { auth, role } from '../middleware';
import { Role } from '../models/Role.enum';

const router = express.Router();

router.post('/bloggers', auth, role.checkRole(Role.Admin), allBloggers);
router.post('/users',auth, role.checkRole(Role.Admin), allUsers);
router.post('/ban/:id', auth, role.checkRole(Role.Admin), Ban);


export { router as AdminRouter };
