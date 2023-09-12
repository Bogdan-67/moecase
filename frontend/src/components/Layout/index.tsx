import React, { FC, PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import Meta from '../seo/Meta';
import { IMeta } from '../seo/IMeta';

const Layout: FC<PropsWithChildren<IMeta>> = ({ children, title, description }) => {
  return (
    <Meta title={title} description={description}>
      <div className={styles.wrapper}>
        <Header type='user' />
        <section className={styles.wrapper__body}>{children}</section>
        <Footer />
      </div>
    </Meta>
  );
};

export default Layout;
