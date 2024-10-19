import CreateCase from '@/components/screens/admin/cases/create';
import $api from '@/http';
import { IGroup, IGroupData } from '@/models/IGroup';
import { IStock, IStockData } from '@/models/IStock';
import { GetStaticProps, NextPage } from 'next';

interface CreateCaseProps extends IGroupData, IStockData {}

const CreateCasePage: NextPage<CreateCaseProps> = ({ groups, stocks }) => {
  return <CreateCase groups={groups} stocks={stocks} />;
};

export const getStaticProps: GetStaticProps<CreateCaseProps> = async () => {
  const { data: groups } = await $api.get<IGroup[]>('case-groups');
  const { data: stocks } = await $api.get<IStock[]>('stocks');

  return {
    props: { groups, stocks },
    revalidate: 5,
  };
};

export default CreateCasePage;
