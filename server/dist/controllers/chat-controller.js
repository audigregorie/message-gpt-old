import User from '../models/User.js';
import { configureOpenAI } from '../config/openai.js';
import { OpenAIApi } from 'openai';
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: 'User not registered OR Token malfunctioned' });
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered OR Token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({
            message: 'SUCCESS',
            chats: user.chats
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered OR Token malfunctioned');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // user.chats = [];
        // await user.save();
        await User.updateOne({ _id: user._id }, { $set: { chats: [] } });
        return res.status(200).json({ message: 'SUCCESS' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            cause: err.message
        });
    }
};
//# sourceMappingURL=chat-controller.js.map