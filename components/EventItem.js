import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/scss/EventItem.module.scss';
import { defaultImgSource } from '@/config/index';

const EventItem = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image.formats.thumbnail.url : defaultImgSource}
          alt=""
          height={100}
          width={170}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
