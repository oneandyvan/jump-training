import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../context/useAuth';

export default function Header () {

    return (
        <header className={styles.header}>
            <Navbar/>
        </header>
    );
}

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useAuth();

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        setUser(null);
        navigate('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navInfo}>
                <Link to="/">Home</Link>
                <Link to="/accounts">Accounts</Link>
                <Link to="/transactions">Transactions</Link>
            </div>      
            <div>
                {user ? (
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Log Out
                    </button>
                ) : (
                    <Link to="/login" className={styles.loginItem}>Login</Link>
                )}
            </div>          
        </nav>
    )
}