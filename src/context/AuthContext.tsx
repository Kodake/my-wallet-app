import { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext({} as any);

export interface AuthState {
    type?: 'AUTH_IS_READY' | 'LOGIN' | 'LOGOUT';
    user: string | null;
    authIsReady: boolean;
}

const authInicialState: AuthState = {
    user: null,
    authIsReady: false
}

const authReducer = (state: AuthState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
        });
    }, []);

    console.log('AuthContext state', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}