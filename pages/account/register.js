import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, Toast, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/scss/AuthForm.module.scss';
import { AuthContext } from '@/context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const nameInput = useRef(null);

  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
  });
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('password do not match!');
      return;
    }
    register({ username, email, password });
  };
  return (
    <Layout title="Register :: DJ Events">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name=""
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={nameInput}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name=""
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              name=""
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account?
          <Link href="/account/login"> Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
