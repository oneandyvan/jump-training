import styles from './Login.module.css';

export default function LoginError({error} : {error: string}) {
    return (
        <div className={styles.loginError}>
            {error}
        </div>
    );
}