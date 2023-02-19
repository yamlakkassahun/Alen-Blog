
import express from 'express';
import { auth, role } from '../middleware';
import { Role } from '../models/Role.enum';
import { getAllUsers, myBookmarks, bookmarkBlog } from '../controllers';

const router = express.Router();

router.post('/list', auth, role.checkRole(Role.Admin), getAllUsers);
router.post('/bookmark/:id', auth, role.checkRole(Role.User), bookmarkBlog);
router.post('/bookmarks', auth, role.checkRole(Role.User), myBookmarks);

export { router as UserRouter };
