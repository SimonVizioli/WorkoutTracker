import { configDotenv } from "dotenv";
import express from "express";
import { workoutsRouter } from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from "cors";

//express app
const app = express();
configDotenv();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/workouts", workoutsRouter);

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
