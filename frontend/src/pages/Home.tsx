import { getUser } from '../services/loginService';
import WelcomeMessage from '../components/home/WelcomeMessage';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const checkUser = () => {
        const currentUser = getUser();
        setUser(currentUser);
    };

    checkUser();
  }, [location]);

  return (
    <main className="main">
      {user ? (
        <WelcomeMessage name={user.name} />
      ) : (
        <>
          <h1>Welcome to the Bank!</h1>
          <p>Sign in to view your accounts and transactions</p>
        </>
      )}
    </main>
  );
}
