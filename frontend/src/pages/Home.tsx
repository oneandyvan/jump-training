import { getUser } from '../services/loginService';
import WelcomeMessage from '../components/home/WelcomeMessage';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultMessage from '../components/home/DefaultMessage';

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
        <DefaultMessage />
      )}
    </main>
  );
}
