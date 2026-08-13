import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AccountCollection from "../components/accounts/AccountCollection";

export default function Accounts() {
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
        <h1>Accounts</h1>
        <p>View and manage your bank accounts here</p>
        <AccountCollection userId={user.id}/>
      </main>
    );
  }
  else {
    return (
      <main className="main">
        <h1>Your Accounts</h1>
        <p>View and manage your bank accounts here</p>
      </main>
    );
  }
}
