import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { Status } from '../models/Role.enum';

export const allBloggers = async (req: Request, res: Response, next: NextFunction) => {
    const bloggers = await User.find({ role: 'ROLE_BLOGGER'})
    res.status(200).json({ bloggers });
}

export const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({ role: 'ROLE_USER'})
    res.status(200).json({ users });
}

export const Ban = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        user.status = Status.InActive;
        user.save();

        res.status(200).json({ message: 'Status Updated Successfully' });

    } catch (error) {
        return res.status(400).json({
            error: 'User Not Found'
        });
    }
}
