import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';
import { Transaction, Transactions } from '../interfaces/appInterfaces';

export const useCollection = (collection: string) => {
    const [documents, setDocuments] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get the collection ref
        // let ref = projectFirestore.collection(collection);

        // Get the collection ref using query
        let ref = projectFirestore.collection(collection);

        const unsubscribe = ref.onSnapshot((snapshot: any) => {
            let results: Transaction[] = [];

            snapshot.docs.forEach((doc: any) => {
                results.push({ ...doc.data(), id: doc.id })
            });

            // Update state
            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not fetch the data');
        });

        // Unsubscribe from events when the component unmounts
        return () => {
            unsubscribe();
        }

    }, [collection]);

    return { documents, error };

}
