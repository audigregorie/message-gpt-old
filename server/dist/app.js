import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { setupMiddlewares } from './config/middlewares.js';
const app = express();
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });
setupMiddlewares(app);
app.use('/api/v1', router);
export default app;
//# sourceMappingURL=app.js.map