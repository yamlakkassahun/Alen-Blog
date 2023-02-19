import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, myBlogs, updateBlog } from '../controllers';
import { auth, role } from '../middleware';
import { Role } from '../models/Role.enum';

const router = express.Router();

router.get('/my', auth, role.checkRole(Role.Blogger), myBlogs);
router.get('/list', auth, getAllBlogs);
router.get('/:id', auth, getBlog);
router.post('/', auth, role.checkRole(Role.Blogger), createBlog);
router.put('/:id', auth, role.checkRole(Role.Blogger), updateBlog);
router.delete('/:id', auth, role.checkRole(Role.Blogger), deleteBlog);


export { router as BlogRouter };