import WorkoutModel from "../models/workouts.js";
import mongoose from "mongoose";

export const getAllWorkouts = async (req, res) => {
    const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
};

export const getWorkoutById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" });

    const workout = await WorkoutModel.findById(id);
    if (!workout) return res.status(404).json({ error: "No such workout" });

    res.status(200).json(workout);
};

export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (!reps) {
        emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const workout = await WorkoutModel.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" });

    const workout = await WorkoutModel.findOneAndDelete({ _id: id });
    if (!workout) return res.status(404).json({ error: "No such workout" });

    res.status(200).json(workout);
};

export const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" });

    const workout = await WorkoutModel.findOneAndUpdate(
        { _id: id },
        {
            title,
            reps,
            load,
        }
    );

    if (!workout) return res.status(404).json({ error: "No such workout" });

    res.status(200).json(workout);
};
