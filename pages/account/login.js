import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/scss/AuthForm.module.scss';
import { AuthContext } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(AuthContext);
  const emailInput = useRef(null);

  useEffect(() => {
    error && toast.error(error);
  });

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="Login :: DJ Events">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name=""
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInput}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don{`'`}t have an account?
          <Link href="/account/register"> Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
