import Layout from '@/components/Layout';
import { ICase } from '@/models/ICase';
import React, { FC, useEffect } from 'react';
import styles from './CaseScreen.module.scss';
import StockCard from '@/components/StockCard';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useOpenCaseMutation } from '@/redux/services/case';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

type Props = {
  icase: ICase;
};

const CaseScreen: FC<Props> = ({ icase }) => {
  const [openCase, { data, isSuccess, isLoading, isError, reset }] = useOpenCaseMutation();

  const handleOpenFast = async () => {
    await openCase({ id_case: icase.id_case });
  };

  const handleRetry = () => {
    reset();
  };

  return (
    <Layout title={`${icase.name}`}>
      <div className={styles.casePage}>
        <h1 className={styles.casePage__title_main}>
          {icase.name}
          <MdOutlineFavoriteBorder title={'Добавить в избранное'} className={styles.favorite} />
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div>{isError ? isError : 'Произошла ошибка :('}</div>
        ) : isSuccess ? (
          <>
            <div className={styles.casePage__content}>
              <StockCard stock={data} />
            </div>
            <div className={styles.casePage__buttons}>
              <button onClick={handleRetry}>Открыть еще раз</button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.casePage__content}></div>
            <div className={styles.casePage__buttons}>
              <button>Открыть за {icase.price} руб.</button>
              <button onClick={handleOpenFast}>Открыть быстро</button>
            </div>
          </>
        )}
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
