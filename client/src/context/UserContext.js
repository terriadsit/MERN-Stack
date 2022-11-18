import { createContext, useReducer } from "react";

export const UserContext = createContext()

export const userReducer = (state, action) => { //state is prev state before change
    switch (action.type) {
        case 'SIGNUP':
            return  {            //return a new value that we want the state to be
               user: action.payload
            }
        case 'LOGIN':  // to keep local state matching db, dispatch  action when adding to db
            return {
                user: action.payload  //prev state workout objects
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

    // to update state, first call the dispatch function, the argument inside is called an action
    // 1st argument describe in words the change type, 2nd is payload = any data needed to make this change
   // calling dispatch invokes the reducer function, passes the action into the reducer function
   // ex dispatch({type: "SET_WORKOUTS", payload})

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { //reducer function name, initial value for the state 
        user: null
    }) 
   

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}