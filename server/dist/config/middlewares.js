import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
export const setupMiddlewares = (app) => {
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
        });
    }
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
};
//# sourceMappingURL=middlewares.js.map