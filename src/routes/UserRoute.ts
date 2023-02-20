
import express from 'express';
import { auth, role } from '../middleware';
import { Role } from '../models/Role.enum';
import { getAllUsers, myBookmarks, bookmarkBlog } from '../controllers';

const router = express.Router();

router.post('/list', auth, role.checkRole(Role.Admin), getAllUsers);
router.get('/bookmarks', auth, role.checkRole(Role.User), myBookmarks);
router.post('/bookmark/:id', auth, role.checkRole(Role.User), bookmarkBlog);

export { router as UserRouter };
