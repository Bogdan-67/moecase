import { NextPage } from 'next';
import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineRise, AiOutlineAudit } from 'react-icons/ai';

type Props = {
  type: string;
};

const HeaderItems = [
  {
    icon: () => {
      return <AiOutlineRise />;
    },
    title: 'Апгрейд',
    link: '/upgrade',
  },
  {
    icon: () => {
      return <AiOutlineAudit />;
    },
    title: 'Контракты',
    link: '/contracts',
  },
];

const Header: NextPage<Props> = ({ type }) => {
  return (
    <section className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>MOECASE</Link>
      </div>
      <ul className={styles.navbar}>
        {type === 'user' &&
          HeaderItems.map((navitem, index) => (
            <Link key={index} href={navitem.link} className={styles.navbar__item}>
              <span className={styles.navbar__item__icon}>{navitem.icon()}</span>
              {navitem.title}
            </Link>
          ))}
      </ul>
      <div className={styles.user}>
        <div className={styles.user__avatar}>
          <Image
            objectFit='cover'
            src={
              'https://imageio.forbes.com/specials-images/imageserve/563a33fde4b0ffa7afe6b110/0x0.jpg?format=jpg&amp;width=1200'
            }
            alt=''
            fill={true}
          />
        </div>
        <div className={styles.user__content}>
          <span className={styles.green}>Привет,</span>
          <span>{'Уоррен Баффет'}!</span>
          {type === 'user' && (
            <div className={styles.user__content__balance}>
              Счет: <span className={styles.green}>{5409.26} ₽</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
