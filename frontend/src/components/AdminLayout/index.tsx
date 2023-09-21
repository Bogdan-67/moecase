import React, { FC, PropsWithChildren } from 'react';
import Header from '../Header';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.scss';
import Meta from '../seo/Meta';

type Props = {
  title: string;
};

const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <Meta title='Администрирование'>
      <div className={styles.page}>
        <Header type='admin' />
        <div className={styles.wrapper}>
          <AdminSidebar />
          <div className={styles.content}>
            <h1 className={styles.content__title}>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </Meta>
  );
};

export default AdminLayout;
