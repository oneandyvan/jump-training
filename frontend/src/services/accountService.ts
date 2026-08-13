const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export interface AccountResponse {
    user_id: string;
    id: string;
    balance: number
    account_type: string;
    created_at: string;
}

interface CreateAccountInput {
  user_id: string;
  account_type: string;
}

export async function getAccountsForUser(customerId: string): Promise<AccountResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch accounts with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error });
    }
    throw new Error('An unexpected error occurred during fetching accounts', { cause: error });
  }
}

export async function createAccount(payload: CreateAccountInput): Promise<AccountResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to make account with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error });
    }
    throw new Error('An unexpected error occurred while making account', { cause: error });
  }
}