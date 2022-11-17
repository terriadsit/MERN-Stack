import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext) // returns the value of the WorkoutContext, the value passed into the provider component, value={state, dispatch}
                                                // now {state, dispatch} is stored in context
    if (!context) {
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }

    return context
}                       