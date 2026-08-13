import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Transactions() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user) {
    return (
      <main className="main">
        <h1>Transactions</h1>
        <p>View your transaction history here</p>
      </main>
    );
  }
  else {
    return (
      <main className="main">
        <h1>Transactions</h1>
        <p>View your transaction history here</p>
      </main>
    );
  }
}
