import { useState } from "react"
import { type AccountResponse } from "../../services/accountService"
import styles from "./AccountCard.module.css"

export default function AccountCard({ account }: { account: AccountResponse }) {
    const [amount, setAmount] = useState("0.00")

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div>
                    <span className={styles.accountLabel}>Account</span>
                    <h3>{account.account_type}</h3>
                </div>
                <button type="button" className={styles.deleteButton}>
                    Delete
                </button>
            </div>

            <div className={styles.balanceSection}>
                <span className={styles.balanceLabel}>Balance</span>
                <div className={styles.balanceValue}>${account.balance.toFixed(2)}</div>
            </div>

            <label className={styles.amountField}>
                <span>Amount</span>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="0.00"
                />
            </label>

            <div className={styles.actionRow}>
                <button type="button" className={`${styles.actionButton} ${styles.depositButton}`}>
                    Deposit
                </button>
                <button type="button" className={`${styles.actionButton} ${styles.withdrawButton}`}>
                    Withdraw
                </button>
            </div>

            <div className={styles.cardFooter}>
                <p>Created: {new Date(account.created_at).toDateString()}</p>
                <i>Account ID: {account.id}</i>
            </div>
        </article>
    )
}