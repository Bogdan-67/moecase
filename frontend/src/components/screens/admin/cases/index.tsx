import AdminLayout from '@/components/AdminLayout';
import React from 'react';
import styles from './Cases.module.scss';
import { useRouter } from 'next/router';

type Props = {};

const LinkItems = [
  {
    title: 'Создание кейса',
    link: '/create',
  },
  {
    title: 'Редактирование кейса',
    link: '/edit',
  },
];

const AdminCases = (props: Props) => {
  const { pathname, push } = useRouter();

  return (
    <AdminLayout title='Выберите действие'>
      <div className={styles.buttons}>
        {LinkItems.map((item) => (
          <button onClick={() => push(pathname + item.link)}>{item.title}</button>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminCases;
