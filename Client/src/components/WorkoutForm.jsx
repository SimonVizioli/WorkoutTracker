import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState(0);
    const [reps, setReps] = useState(0);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const workout = { title, load, reps };
            const response = await axios.post(
                "http://localhost:3000/api/workouts",
                workout
            );
            if (response) {
                setError(null);
                setEmptyFields([]);
                setTitle("");
                setLoad("");
                setReps("");
                dispatch({
                    type: "CREATE_WORKOUT",
                    payload: response.data,
                });
                console.log("new workout added:", response.data);
            }
        } catch (error) {
            setEmptyFields(error.response.data.emptyFields);
            setError(error.response.data.error);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
