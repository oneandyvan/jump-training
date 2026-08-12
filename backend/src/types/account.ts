export interface Account {
    id: string;
    user_id: string;
    balance: number;
    account_type: string;
    created_at: Date;
}

export type AccountInput = Omit<Account, "id" | "balance" | "created_at">;