import WelcomeMessage from '../components/home/WelcomeMessage';
import DefaultMessage from '../components/home/DefaultMessage';
import { useAuth } from '../context/useAuth';

export default function Home() {
  const { user } = useAuth();

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
