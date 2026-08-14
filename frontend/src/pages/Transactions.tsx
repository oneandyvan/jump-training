import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import TransactionTable from "../components/transactions/TransactionTable";

export default function Transactions() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user && token) {
    return (
      <main className="main">
        <h1>Transactions</h1>
        <p>View your transaction history here</p>
        <TransactionTable userId={user.id} token={token} />
      </main>
    );
  }
  else {
    return (
      <main className="main">
        <h1>Transactions</h1>
        <p>View your transaction history here (for existing accounts only)</p>
      </main>
    );
  }
}
