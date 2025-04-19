import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookiParser from "cookie-parser";
import connectDb from "./utils/database.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import buyRouter from "./routes/buyRoutes.js";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookiParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/buy", buyRouter);
   
const port = process.env.PORT || 4000;

app.listen(port,async()=>{
    try {
        await connectDb(); // Ensure database connection before server starts
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});