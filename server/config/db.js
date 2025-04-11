import mongoose from "mongoose";

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskMateDB')
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection error:', err);
    }
}

export default connectToDB