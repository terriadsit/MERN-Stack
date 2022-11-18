import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext) // returns the value of the WorkoutContext, the value passed into the provider component, value={state, dispatch}
                                                // now {state, dispatch} is stored in context
    if (!context) {
        throw Error('useUserContext must be used inside a UserContextProvider')
    }

    return context
}                       