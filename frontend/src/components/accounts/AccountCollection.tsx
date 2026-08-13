import styles from './AccountCollection.module.css'
import { useState, useEffect } from "react";
import { createAccount, getAccountsForUser, type AccountResponse } from '../../services/accountService';
import AccountCard from './AccountCard';

export default function AccountCollection({userId} : {userId: string}) {
    const [accounts, setAccounts] = useState<AccountResponse[] | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [accountType, setAccountType] = useState<'CHECKING' | 'SAVINGS'>('CHECKING');

    useEffect(() => {
        async function fetchAccounts() {
            setAccounts(await getAccountsForUser(userId));
        }

        fetchAccounts();
    }, [userId]);

    async function handleCreateAccount() {
        try {
            setIsCreating(true);
            const newAccount = await createAccount({
                user_id: userId,
                account_type: accountType,
            });

            setAccounts((currentAccounts) => currentAccounts ? [newAccount, ...currentAccounts] : [newAccount]);
        } catch (error) {
            console.error('Failed to create account:', error);
            alert(error instanceof Error ? error.message : 'Failed to create account');
        } finally {
            setIsCreating(false);
        }
    }

    //  Callback for child cards to update parent state
    function handleAccountUpdated(updatedAccount: AccountResponse) {
        setAccounts((currentAccounts) =>
            currentAccounts
                ? currentAccounts.map((account) =>
                    account.id === updatedAccount.id
                        ? updatedAccount
                        : account
                )
                : [updatedAccount]
        );
    }

    return (
        <section className={styles.accountSection}>
            <div className={styles.accountHeader}>
                <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as 'CHECKING' | 'SAVINGS')}
                >
                    <option value="CHECKING">Checking</option>
                    <option value="SAVINGS">Savings</option>
                </select>
                <button
                    type="button"
                    className={styles.createAccountButton}
                    onClick={handleCreateAccount}
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Account'}
                </button>
            </div>

            <div className={styles.accountCollection}>
                {accounts?.map((account) => (
                    <AccountCard
                        key={account.id}
                        account={account}
                        onAccountUpdated={handleAccountUpdated}
                    />
                ))}
            </div>
        </section>
    )
}