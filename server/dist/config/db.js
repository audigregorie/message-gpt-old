import mongoose from 'mongoose';
export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB successfully');
    }
    catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        throw new Error('Cannot connect to MongoDB');
    }
};
export const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();
    }
    catch (err) {
        console.error(`Error disconnecting from MongoDB: ${err.message}`);
        throw new Error('Could not disconnect from MongoDB');
    }
};
//# sourceMappingURL=db.js.map