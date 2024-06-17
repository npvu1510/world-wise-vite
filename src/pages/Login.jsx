import { useEffect, useState } from 'react';

import PageNav from '../components/PageNav';

import styles from './Login.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123');

  const { login, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (isAuthenticated) navigate('/app', { replace: true });
    },
    [isAuthenticated, navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //   console.log(`Login: ${isAuthenticated}`);

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </form>
    </main>
  );
}
