import AdminLayout from '@/components/AdminLayout';
import { useCreateGroupMutation } from '@/redux/services/group';
import React, { useState } from 'react';
import styles from './CreateGroup.module.scss';

type Props = {};

const CreateGroup = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [createGroup, { isLoading, error }] = useCreateGroupMutation();

  const handleCreate = () => {
    createGroup({
      name,
    });
    setName('');
  };

  return (
    <AdminLayout title='Создание группы'>
      {isLoading ? (
        <div>isLoading ...</div>
      ) : (
        <div className={styles.form}>
          {error && <div>{error.data.message ? error.data.message : 'error'}</div>}
          <input
            className={styles.form__input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Название'
          />
          <button className={styles.form__button} onClick={handleCreate}>
            Создать
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default CreateGroup;
