import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => { //state is prev state before change
    switch (action.type) {
        case 'LOGIN':  // to keep local state matching db, dispatch  action when adding to db
            return {
                user: action.payload  //prev state user objects
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

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { //reducer function name, initial value for the state 
        user: null
    }) 

    useEffect(() => {  // stored as JSON string so needs to be parsed into a javascript object
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
   
    console.log('AuthContext state', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}