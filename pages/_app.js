import '../styles/scss/globals.scss';
import LoadingBar from '@/components/LoadingBar';
import AuthProvider from '@/context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LoadingBar />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
