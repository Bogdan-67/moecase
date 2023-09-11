import Image from 'next/image';
import { useEffect } from 'react';
import $api from '@/http';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import History from '@/components/History';
import { useGetAllCasesQuery, useGetCaseGroupsQuery } from '@/redux/services/case';
import { ICase } from '@/models/ICase';
import CaseCard from './CaseCard';
import CaseTrack from './CaseTrack';

const Home: NextPage = () => {
  const { data, isLoading, error } = useGetCaseGroupsQuery();

  return (
    <Layout>
      <History />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        data?.map((group) => (
          <div>
            <h2>{group.name}</h2>
            <CaseTrack id_group={group.id_group} />
          </div>
        ))
      )}
    </Layout>
  );
};

export default Home;
