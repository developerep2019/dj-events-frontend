import styles from '@/styles/scss/Search.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Search() {
  const [term, setTerm] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}
