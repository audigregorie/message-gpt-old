import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';

export const setupMiddlewares = (app: any) => {
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req: any, res: any) => {
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
