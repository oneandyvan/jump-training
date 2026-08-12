import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header () {

    return (
        <header className={styles.header}>
            <Navbar/>
        </header>
    );
}

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/accounts">Accounts</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}