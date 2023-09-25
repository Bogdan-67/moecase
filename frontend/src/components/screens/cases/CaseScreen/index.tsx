import Layout from '@/components/Layout';
import { ICase } from '@/models/ICase';
import React, { FC } from 'react';
import styles from './CaseScreen.module.scss';
import StockCard from '@/components/StockCard';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';

type Props = {
  icase: ICase;
};

const CaseScreen: FC<Props> = ({ icase }) => {
  console.log(icase);
  return (
    <Layout title={`${icase.name}`}>
      <div className={styles.casePage}>
        <h1 className={styles.casePage__title_main}>
          {icase.name}
          <MdOutlineFavoriteBorder title={'Добавить в избранное'} className={styles.favorite} />
        </h1>
        <div className={styles.casePage__buttons}>
          <button>Открыть за {icase.price} руб.</button>
          <button>Открыть быстро</button>
        </div>
        <h2 className={styles.casePage__title_scope}>Содержимое</h2>
        <div className={styles.scope}>
          {icase.items.map((stock) => (
            <StockCard stock={stock} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CaseScreen;
