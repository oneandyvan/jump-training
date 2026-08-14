import { useState } from "react"
import styles from "./AccountCard.module.css"
import { depositAccount, withdrawAccount, deleteAccount, type AccountResponse } from "../../services/accountService"

type AccountCardProps = {
    account: AccountResponse, 
    token: string, 
    onAccountUpdated: (updatedAccount: AccountResponse) => void, 
    onAccountDeleted: (deletedAccountId: string) => void
}

export default function AccountCard({ account, token, onAccountUpdated, onAccountDeleted }: AccountCardProps) {
    const [amount, setAmount] = useState("0.00");
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this account?")) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteAccount(account.id, token);
            onAccountDeleted(account.id);
        } catch (error) {
            console.error('Failed to delete account:', error);
            alert(error instanceof Error ? error.message : 'Failed to delete account');
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleDeposit() {
        const depositAmount = Number(amount);
        if (!depositAmount || depositAmount <= 0) {
            return;
        }

        try {
            await depositAccount({
                accountId: account.id,
                amount: depositAmount,
                token,
            });

            const updatedAccount = {
                ...account,
                balance: account.balance + depositAmount
            }

            // Tell parent about updated account
            onAccountUpdated(updatedAccount);

            setAmount("");

        } catch (error) {
            console.error('Failed to deposit into account:', error);
            alert(error instanceof Error ? error.message : 'Failed to deposit into account');
        }
    }
    
    async function handleWithdraw() {
        const withdrawAmount = Number(amount);
        if (!withdrawAmount || withdrawAmount <= 0) {
            return;
        }

        try {
            await withdrawAccount({
                accountId: account.id,
                amount: withdrawAmount,
                token,
            });

            const updatedAccount = {
                ...account,
                balance: account.balance - withdrawAmount
            }

            // Tell parent about updated account
            onAccountUpdated(updatedAccount);

            setAmount("");

        } catch (error) {
            console.error('Failed to withdraw from account:', error);
            alert(error instanceof Error ? error.message : 'Failed to withdraw from account');
        }
    }

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div>
                    <span className={styles.accountLabel}>Account</span>
                    <h3>{account.account_type}</h3>
                </div>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
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
                <button 
                    type="button" 
                    className={`${styles.actionButton} ${styles.depositButton}`}
                    onClick={handleDeposit}
                >
                    Deposit
                </button>
                <button 
                    type="button" 
                    className={`${styles.actionButton} ${styles.withdrawButton}`}
                    onClick={handleWithdraw}
                >
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