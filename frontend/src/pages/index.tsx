import Home from '@/components/screens/home';
import $api from '@/http';
import { IGroup, IGroupData } from '@/models/IGroup';
import { useGetCaseGroupsQuery } from '@/redux/services/case';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage<IGroupData> = ({ groups }) => {
  return <Home groups={groups} />;
};

export const getStaticProps: GetStaticProps<IGroupData> = async () => {
  const { data } = await $api.get<IGroup[]>('case-groups');

  return {
    props: { groups: data },
    revalidate: 5,
  };
};

export default HomePage;
