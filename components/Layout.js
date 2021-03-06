import Head from 'next/head';
import styles from '@/styles/scss/Layout.module.scss';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';
import LoadingBar from './LoadingBar';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hotest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
};
