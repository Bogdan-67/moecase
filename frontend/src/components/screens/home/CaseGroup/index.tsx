import React, { FC } from 'react';
import styles from './CaseGroup.module.scss';
import { useGetCasesByGroupQuery } from '@/redux/services/case';
import { ICase } from '@/models/ICase';
import CaseCard from '../CaseCard';

type Props = {
  id_group: number;
  name: string;
};

const CaseGroup: FC<Props> = ({ id_group, name }) => {
  const { data, isLoading, error } = useGetCasesByGroupQuery(id_group);

  return (
    <div className={styles.group}>
      <h2 className={styles.group__title}>{name}</h2>

      <div className={styles.track}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>error</div>
        ) : (
          data?.map((item: ICase) => <CaseCard key={item.id_case} {...item} />)
        )}
      </div>
    </div>
  );
};

export default CaseGroup;
