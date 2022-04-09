// Styles
import { Transaction } from '../../interfaces/appInterfaces';
import styles from './Home.module.css';

interface Props {
    transactions: Transaction[];
}

const TransactionList = ({ transactions }: Props) => {

    return (
        <ul className={styles.transactions}>
            {transactions.map((document: Transaction) => (
                <li key={document.id}>
                    <p className={styles.name}>{document.name}</p>
                    <p className={styles.amount}>$ {document.amount}</p>
                </li>
            ))}
        </ul>
    )
}

export default TransactionList