import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { COOKIE_NAME } from '../utils/constants.js';
import { createToken } from '../config/auth/token.js';
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: 'OK',
            users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send('User already registered');
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: '/'
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            message: 'OK',
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not registered');
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send('Incorrect Password');
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: '/'
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({
            message: 'OK',
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        if (!res.locals.jwtData) {
            return res.status(401).send('Authentication data not found');
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered OR Token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({
            message: 'OK',
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered OR Token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: '/'
        });
        return res.status(200).json({
            message: 'OK',
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
//# sourceMappingURL=user-controllers.js.map