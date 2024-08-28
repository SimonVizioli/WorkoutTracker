import { useEffect, useState } from "react";
import axios from "axios";
// components
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/workouts",
                { headers: { Authorization: `Bearer ${user.token} ` } }
            );
            if (response) {
                dispatch({ type: "SET_WORKOUTS", payload: response.data });
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
