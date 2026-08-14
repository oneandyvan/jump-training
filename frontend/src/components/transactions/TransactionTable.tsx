import { useEffect, useState } from "react";
import { getTransactionsForUser, type TransactionResponse } from "../../services/transactionService";
import styles from "./TransactionTable.module.css";

export default function TransactionTable({userId, token} : {userId: string, token: string}) {
    const [transactions, setTransactions] = useState<TransactionResponse[] | null>(null);

    useEffect(() => {
        async function fetchTransactions() {
            setTransactions(await getTransactionsForUser(userId, token));
        }

        fetchTransactions();
    }, [userId, token]);

    return (
        <section className={styles.transactionSection}>
            {transactions ? (
                <table className={styles.transactionTable}>
                    <thead>
                        <tr>
                            <th>Account ID</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.account_id}</td>
                                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                                <td>{transaction.txn_type}</td>
                                <td>{transaction.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading transactions...</p>
            )}
        </section>
    )
}