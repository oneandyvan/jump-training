import { useNavigate } from "react-router-dom";
import styles from './DefaultMessage.module.css';

export default function DefaultMessage() {
  const navigate = useNavigate();

    return (
        <section className={styles.defaultMessage}>
            <div>
                <h1>Welcome to the Bank!</h1>
                <p>Sign in to view your accounts and transactions</p>
            </div>
            <button 
                className={styles.loginButton}
                onClick={() => navigate('/login')}
            >
                Login
            </button>
        </section>
    )
}