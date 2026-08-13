import styles from './AccountCollection.module.css'
import { useState, useEffect } from "react";
import { getAccountsForUser, type AccountResponse } from '../../services/accountService';
import AccountCard from './AccountCard';

export default function AccountCollection({userId} : {userId: string}) {
    const [accounts, setAccounts] = useState<AccountResponse[] | null>(null);

    useEffect(() => {
        async function fetchAccounts() {
            setAccounts(await getAccountsForUser(userId));
        }

        fetchAccounts();
    }, [userId]);

    return (
        <section className={styles.accountCollection}>
            {accounts?.map((account) => (
                <AccountCard
                    key={account.id}
                    account={account}
                />
            ))}
        </section>
    )
}