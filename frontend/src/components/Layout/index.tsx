import React, { FC, PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import Meta from '../seo/Meta';
import { IMeta } from '../seo/IMeta';
import { useAppDispatch } from '@/hooks/redux';
import { checkAuth } from '@/redux/slices/authSlice';

const Layout: FC<PropsWithChildren<IMeta>> = ({ children, title, description }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

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
