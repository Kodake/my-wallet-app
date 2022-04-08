import { ErrorInfo, useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email: string, password: string, displayName: string) => {
        setError(null);
        setIsPending(true);

        try {
            // Signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);

            if (!res) {
                throw new Error('Could not complete the signup');
            }

            // Add display name to user
            await res.user?.updateProfile({ displayName });

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

    return { error, isPending, signUp };
}
