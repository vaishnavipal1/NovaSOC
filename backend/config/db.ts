import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB Connection Error:", error.message);
    } else {
      console.error("❌ MongoDB Connection Error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
