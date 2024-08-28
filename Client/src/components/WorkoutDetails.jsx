import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await axios.delete(
                "http://localhost:3000/api/workouts/" + workout._id,
                { headers: { Authorization: `Bearer ${user.token} ` } }
            );

            if (response) {
                console.log("response", response);
                dispatch({ type: "DELETE_WORKOUT", payload: response.data });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p>
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p>
                <strong>Number of reps: </strong>
                {workout.reps}
            </p>
            <p>
                {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    );
};

export default WorkoutDetails;
