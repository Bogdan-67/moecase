import CaseScreen from '@/components/screens/cases/CaseScreen';
import $api from '@/http';
import { ICase } from '@/models/ICase';
import CaseService from '@/services/CaseService';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export const CasePage: NextPage<{ icase: ICase }> = ({ icase }) => {
  return <CaseScreen icase={icase} />;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await CaseService.getAllCases();
  console.log(data);

  return {
    paths: data.map((item) => ({
      params: {
        id: item.id_case.toString(),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{ icase: ICase }> = async ({ params }) => {
  const { data } = await CaseService.getCaseById(Number(params?.id));

  return {
    props: { icase: data },
    revalidate: 60,
  };
};

export default CasePage;
