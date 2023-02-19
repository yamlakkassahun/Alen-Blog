import { Request, Response, NextFunction } from 'express';
import { Blog, User } from '../models';

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await Blog.find({}).sort({ createAt: -1 });
    res.status(200).json({ blogs });
}

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        res.status(200).json({ blog });
    } catch (error) {
        return res.status(400).json({
            error: 'Blog not found'
        });
    }
}

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const blogger = req.user.firstName;
    const userId = req.user._id;

    try {
        const extBlog = await Blog.findOne({ title: title });

        console.log(extBlog);
        if (extBlog) {
            return res.status(400).json({
                error: 'Blog With Title Exists'
            });
        }

        const blog = await Blog.create({
            title,
            contents,
            blogger
        })

        console.log(blog);
        const user = await User.findById(userId);
        user.blogs.push(blog);
        user.save();

        res.status(200).json({ blog });

    } catch (error) {
        return res.status(400).json({
            error: 'Blog not found'
        });
    }
}

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;
    const blogger = req.user.firstName;

    try {
        const extBlog = await Blog.findById(blogId);

        if (!extBlog) {
            return res.status(400).json({
                error: 'Blog With Title Exists'
            });
        }

        if (extBlog.blogger !== blogger) { 
            return res.status(401).json({
                error: 'You are not allowed to edit this blog'
            });
        }

        const blog = await Blog.findOneAndUpdate(blogId, { title, contents, blogger }, { new: true });
        res.status(200).json({ blog });

    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;

    try {
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(400).json({
            error: 'Blog not found'
        });
    }
}

export const myBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    console.log(req);
    try {
        const user = await User.findOne({ _id: userId }).populate('blogs');
        const blogs = user.blogs;
        res.status(200).json({ blogs });
    } catch (error) {
        return res.status(400).json({
            error: 'User not found'
        });
    }
}


