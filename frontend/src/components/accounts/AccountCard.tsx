import { type AccountResponse } from "../../services/accountService"
import styles from "./AccountCard.module.css"

export default function AccountCard({account} : {account: AccountResponse}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <b>{account.account_type}</b>
                <div>${account.balance.toFixed(2)}</div>
            </div>
            <div className={styles.cardFooter}>
                <p>Created: {new Date(account.created_at).toDateString()}</p>
                <i>Account ID: {account.id}</i>
            </div>
        </div>
    )
}