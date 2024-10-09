import mongoose from "mongoose";

let dbConnection: typeof mongoose | null = null;

const dbConnect = async () => {
  if (!dbConnection) {
    try {
      dbConnection = await mongoose.connect(process.env.MONGODB_URI!, {
        bufferCommands: false,
      });
      console.log("Database connected successfully");
    } catch (error) {
      console.log("Error connecting to database");
      console.error(error);
      dbConnection = null;
    }
  }
  return dbConnection;
};

export default dbConnect;
