import React from 'react';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

const PageLoadingBar = () => {
  const ref = useRef(null);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      ref.current.continuousStart();
    });
    router.events.on('routeChangeComplete', () => {
      ref.current.complete();
    });
  }, [router]);
  return <LoadingBar ref={ref} color="#FF0000" />;
};

export default PageLoadingBar;
