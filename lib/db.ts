import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log('MongoDB is already connected');
        return;
    }
    if(connectionState === 2) {
        console.log('MongoDB is in connecting state');
        return;
    }

try{
    mongoose.connect(MONGODB_URI!,{
        dbName: 'NextJs-Rest-API',
        bufferCommands: true
    });
    console.log('MongoDB connected successfully');
}catch(err: any) {
    console.log('MongoDB connection error', err)
    throw new Error('Error', err);
    }
};

export default connect;