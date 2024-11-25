import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
const PORT = Number(process.env.PORT || 5000);
const startServer = async () => {
    try {
        await connectDatabase();
        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        const shutdownServer = async (signal) => {
            console.log(`${signal}: Shutting down server...`);
            try {
                await disconnectDatabase();
                server.close(() => {
                    console.log('Server closed');
                    process.exit(0);
                });
            }
            catch (err) {
                console.error('Error during shutdown:', err.message);
                process.exit(1);
            }
        };
        process.on('SIGINT', () => shutdownServer('SIGINT'));
        process.on('SIGTERM', () => shutdownServer('SIGTERM'));
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map