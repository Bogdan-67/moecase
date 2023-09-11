import React, { FC, PropsWithChildren } from 'react';
import Header from '../Header';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.scss';

const AdminLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header type='admin' />
      <div className={styles.wrapper}>
        <AdminSidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
