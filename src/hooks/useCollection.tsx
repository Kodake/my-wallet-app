import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';
import { Transaction } from '../interfaces/appInterfaces';

type WhereFilterOp = [string, any, string];
type OrderByOp = [string, any | undefined];

export const useCollection = (collection: string, _query: WhereFilterOp, _orderBy: OrderByOp) => {
    const [documents, setDocuments] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is 'different' on every function call
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        // Get the collection ref
        // let ref = projectFirestore.collection(collection);

        // Get the collection ref using query
        let ref = projectFirestore.collection(collection).where(...query);

        if (query) {
            ref = ref.where(...query);
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy);
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

    }, [collection, query, orderBy]);

    return { documents, error };

}
