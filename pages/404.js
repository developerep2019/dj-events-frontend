import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/scss/404.module.scss';

export default function PageNotFound() {
  return (
    <div>
      <Layout title="Page Not Found | DJ Events">
        <div className={styles.error}>
          <h1>
            <FaExclamationTriangle /> 404
          </h1>
          <h4>Sorry, Nothing here</h4>
          <Link href="/">Go Back Home</Link>
        </div>
      </Layout>
    </div>
  );
}
