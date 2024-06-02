import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("_CONNECTED TO MONGODB_");
  } catch (error) {
    console.log("_ERROR WHILE CONNECTING TO MONGODB_");
    console.log(error);
  }
};
export default connectMongoDb;
