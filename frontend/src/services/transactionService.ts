const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export interface TransactionResponse {
  id: string;
  account_id: string;
  created_at: string;
  txn_type: string;
  amount: number;
}

export async function getTransactionsForUser(userId: string, token: string): Promise<TransactionResponse[]> {
  const response = await fetch(`${API_BASE_URL}/customers/${userId}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}