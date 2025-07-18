import mongoose from "mongoose";
import "dotenv/config";

const MongoURI = process.env.MONGODB_URI;

export default function ConnectDB() {
    mongoose.connect(MongoURI)
        .then(() => {
            console.log("✅ Connected to MongoDB");
        })
        .catch((err) => {
            console.error("❌ MongoDB connection error:", err);
            process.exit(1); // Exit the process with failure
        });
}
