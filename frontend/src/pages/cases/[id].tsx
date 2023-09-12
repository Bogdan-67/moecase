import CaseScreen from '@/components/screens/cases/CaseScreen';
import { useRouter } from 'next/router';

export default function CasePage() {
  const { query } = useRouter();

  return <CaseScreen case_id={Number(query.id)} />;
}
