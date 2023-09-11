import React, { FC, PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header type='user' />
      <section className={styles.wrapper__body}>{children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
