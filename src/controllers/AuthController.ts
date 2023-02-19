import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utility';
import HttpException from '../exceptions/HttpException';
import { Role } from '../models/Role.enum';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const SignupBlogger = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
        return res
            .status(400)
            .json({ error: 'That email address is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        salt: salt,
        role: Role.Blogger,
        blogs: [],
        bookmarks: []
    });

    console.log(user);


    res.status(200).json({
        success: true,
        message: 'Activate Successfully Registered',
        data: user
    });
}

export const SignupUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
        return res
            .status(400)
            .json({ error: 'That email address is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        salt: salt,
        role: Role.User,
        blogs: [],
        bookmarks: []
    });

    console.log(user);


    res.status(200).json({
        success: true,
        message: 'Activate Successfully Registered',
        data: user
    });
}


//to log in the admin
export const Login = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ error: 'You must enter an email address.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user || !user.password) {
        return res
            .status(400)
            .send({ error: 'No user found for this email address.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            error: 'Incorrect password.'
        });
    }

    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    };


    jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: '1d' }, (error, token) => {
        console.log(error)
        res.status(200).json({
            success: true,
            token: `${token}`,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    });
}