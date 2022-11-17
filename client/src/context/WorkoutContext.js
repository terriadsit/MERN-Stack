import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) => { //state is prev state before change
    switch (action.type) {
        case 'SET_WORKOUTS':
            return  {            //return a new value that we want the state to be
               workouts: action.payload
            }
        case 'CREATE_WORKOUT':  // to keep local state matching db, dispatch "create_workout" action when adding to db
            return {
                workouts: [action.payload, ...state.workouts] //prev state workout objects
            }
        default:
            return state
    }
}

    // to update state, first call the dispatch function, the argument inside is called an action
    // 1st argument describe in words the change type, 2nd is payload = any data needed to make this change
   // calling dispatch invokes the reducer function, passes the action into the reducer function
   // ex dispatch({type: "SET_WORKOUTS", payload})

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, { //reducer function name, initial value for the state 
        workouts: null
    }) 
   

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}