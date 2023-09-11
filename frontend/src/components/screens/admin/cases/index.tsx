import AdminLayout from '@/components/AdminLayout';
import React from 'react';
import styles from './Cases.module.scss';

type Props = {};

const AdminCases = (props: Props) => {
  return (
    <AdminLayout>
      <h1 className={styles.title}>Выберите действие</h1>
    </AdminLayout>
  );
};

export default AdminCases;
