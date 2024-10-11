import React, { useState, useContext, useEffect } from 'react';
import styles from './Login.module.css';
import Input from 'components/common/input';
import { isValidEmail, isValidPassword } from 'utils';
import { login } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext  } from 'context/AuthContext';

const Login = () => {
  const { user, createSession } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLoginClick = () => {
    setErrors([]);

    const errors = [];

    if (!isValidEmail(email)) {
      errors.push('Invalid email format.');
    }

    if (!isValidPassword(password)) {
      errors.push('Password must be at least 6 characters long and contain both letters and numbers.');
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    doLogin(email, password);
  }

  const doLogin = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await login(email, password);

      setIsLoading(false);

      if (res.success) {
        createSession(email);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors(prevErrors => {
        if (!prevErrors.includes(error.message)) {
          return [...prevErrors, error.message];
        }
        return prevErrors;
      });

      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>ProLogin</h2>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <Input
              type="email"
              className={styles.input}
              value={email}
              onChange={setEmail}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Password</label>
            <Input
              type="password"
              inputMode="password"
              value={password}
              onChange={setPassword} />
          </div>

          {isLoading && (
            <span>Loading...</span>
          )}

          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index} className={styles.error}>{error}</li>
              ))}
            </ul>
          )}

          <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
        </div>
    </div>
  );
};

export default Login;
