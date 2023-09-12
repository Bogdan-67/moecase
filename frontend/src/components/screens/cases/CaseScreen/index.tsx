import Layout from '@/components/Layout';
import React, { FC } from 'react';

type Props = {
  case_id: number;
};

const CaseScreen: FC<Props> = ({ case_id }) => {
  return (
    <Layout title={`case ${case_id}`}>
      <div>CaseScreen</div>
    </Layout>
  );
};

export default CaseScreen;
