export interface Transaction {
    amount: string;
    uid: string;
    createdAt: CreatedAt;
    name: string;
    id: string;
}

export interface Transactions {
    transactions: Transaction[];
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}
