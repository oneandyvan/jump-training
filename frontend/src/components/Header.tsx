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
            <a>Home</a>
            <a>Accounts</a>
            <a>Transactions</a>
        </nav>
    )
}