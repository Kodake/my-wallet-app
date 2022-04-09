import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return {
                isPending: false,
                document: action.payload, success: true,
                error: null
            }
        case 'DELETED_DOCUMENT':
            return {
                isPending: false,
                document: null, success: true,
                error: null
            }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state;
    }
}

export const useFirestore = (collection: string) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // Collection ref
    const ref = projectFirestore.collection(collection);

    // Only dispatch is not cancelled
    const dispatchIfNotCancelled = (action: any) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    // Add a document
    const addDocument = async (doc: any) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err });
        }
    }

    // Delete a document
    const deleteDocument = async (id: string) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err });
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, []);

    return { addDocument, deleteDocument, response };

}
