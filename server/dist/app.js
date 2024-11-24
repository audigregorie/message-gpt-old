import express from 'express';
import { config } from 'dotenv';
import router from './routes/index.js';
import { setupMiddlewares } from './config/middlewares.js';
const app = express();
config();
setupMiddlewares(app);
app.use('/api/v1', router);
export default app;
//# sourceMappingURL=app.js.map