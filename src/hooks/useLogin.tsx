import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setError(null);
        setIsPending(true);

        try {
            // Sign the user in
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            // Update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err: any) {
            if (!isCancelled) {
                console.log(err);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, []);

    return { login, error, isPending };
}
