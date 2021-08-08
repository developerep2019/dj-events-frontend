import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Layout from '@/components/Layout';
import Eventmap from '@/components/Eventmap';
import { API_URL, defaultImgSource } from '@/config/index';
import styles from '@/styles/scss/Event.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function EventPage({ evt }) {
  const router = useRouter();
  const deleteEvent = async () => {
    if (confirm('Are you sure to delete?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image ? evt.image.formats.medium.url : defaultImgSource}
              alt=""
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue : {evt.venue}</h3>
        <p>{evt.address}</p>

        <Eventmap evt={evt} />

        <Link href="/events">
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/events/?slug=${params.slug}`);
  const evt = await res.json();

  return {
    props: { evt: evt[0] },
    revalidate: 1,
  };
}
