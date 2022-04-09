import Swal from 'sweetalert2';
import { useFirestore } from '../../hooks/useFirestore';

// Styles
import { Transaction } from '../../interfaces/appInterfaces';
import styles from './Home.module.css';

interface Props {
    transactions: Transaction[];
}

const TransactionList = ({ transactions }: Props) => {
    const { deleteDocument } = useFirestore('transactions');

    const handleDelete = (id: string) => {
        Swal.fire({
            icon: 'warning',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            text: "You won't be able to revert this!",
            title: 'Are you sure to delete this transaction?',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDocument(id);
                Swal.fire(
                    'Deleted!',
                    'Your transaction has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <ul className={styles.transactions}>
            {transactions.map((document: Transaction) => (
                <li key={document.id}>
                    <p className={styles.name}>{document.name}</p>
                    <p className={styles.amount}>$ {document.amount}</p>
                    <button onClick={() => handleDelete(document.id)}>x</button>
                </li>
            ))}
        </ul>
    )
}

export default TransactionList