import { configDotenv } from "dotenv";
import express from "express";
import { workoutsRouter } from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user.js";

//express app
const app = express();
configDotenv();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutsRouter);
app.use("/api/user", userRouter);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log(
                `Server listening on port http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
