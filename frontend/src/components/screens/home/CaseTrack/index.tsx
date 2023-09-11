import { ICase } from '@/models/ICase';
import { useGetAllCasesQuery, useGetCasesByGroupQuery } from '@/redux/services/case';
import { NextPage } from 'next';
import React from 'react';
import CaseCard from '../CaseCard';
import styles from './CaseTrack.module.scss';

type Props = {
  id_group: number;
};

const CaseTrack: NextPage<Props> = ({ id_group }) => {
  const { data, isLoading, error } = useGetCasesByGroupQuery(id_group);

  return (
    <div className={styles.track}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        data?.map((item: ICase) => <CaseCard key={item.id_case} {...item} />)
      )}
    </div>
  );
};

export default CaseTrack;
