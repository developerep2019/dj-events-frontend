import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  const router = useRouter();

  useEffect(() => {
    if (page < 1) {
      router.push('/events');
    }
  }, []);

  return (
    <div>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No Events to show</h3>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}

        <Pagination page={page} total={total} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();
  return {
    props: { events: events.statusCode ? [] : events, page: +page, total },
  };
}
