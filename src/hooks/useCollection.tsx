import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';
import { Transaction } from '../interfaces/appInterfaces';

export const useCollection = (collection: string, _query: [string, string, string]) => {
    const [documents, setDocuments] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is 'different' on every function call
    const query = useRef(_query).current;

    useEffect(() => {
        // Get the collection ref
        // let ref = projectFirestore.collection(collection);

        // Get the collection ref using query
        let ref = projectFirestore.collection(collection).where(...query);

        if (query) {
            ref = ref.where(...query);
        }

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

    }, [collection, query]);

    return { documents, error };

}
