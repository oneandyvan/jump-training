export interface Transaction {
    id: string;
    account_id: string;
    txn_type: string;
    amount: number;
    created_at: Date;
}