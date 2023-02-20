import { Request, Response, NextFunction } from 'express';
import { Blog, User } from '../models';


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({})
    res.status(200).json({ users });
}


export const bookmarkBlog = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(400).json({
                error: 'Blog Not Found'
            });
        }

        const user = await User.findOne({ _id: userId }).populate('bookmarks');
        user.bookmarks.push(blog);
        await user.save();

        res.status(200).json({ message: 'blog added to bookmarks' });

    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

export const myBookmarks = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    try {
        const user = await User.findOne({ _id: userId }).populate('bookmarks');
        const bookmarks = user.bookmarks;
        res.status(200).json({ bookmarks });

    } catch (error) {
        return res.status(400).json({
            error: 'User not found'
        });
    }
}
