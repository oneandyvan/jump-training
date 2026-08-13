import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { getUser, logout } from '../services/loginService';
import { useEffect, useState } from 'react';

export default function Header () {

    return (
        <header className={styles.header}>
            <Navbar/>
        </header>
    );
}

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(getUser());

    useEffect(() => {
        const checkUser = () => {
            const currentUser = getUser();
            setUser(currentUser);
        };

        // Check user on mount and route change
        checkUser();
        
        // Listen for storage changes (logout from another tab)
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, [location]);

    const handleLogout = () => {
        logout();
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