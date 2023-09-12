import $api from '@/http';
import Layout from '@/components/Layout';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import History from '@/components/History';
import { useGetAllCasesQuery, useGetCaseGroupsQuery } from '@/redux/services/case';
import CaseGroup from './CaseGroup';
import { IGroup, IGroupData } from '@/models/IGroup';
import { FC } from 'react';

const Home: FC<IGroupData> = ({ groups }) => {
  console.log(groups);

  return (
    <Layout title='Главная'>
      <History />
      {groups?.map((group: IGroup) => (
        <CaseGroup key={group.id_group} {...group} />
      ))}
    </Layout>
  );
};

export default Home;
