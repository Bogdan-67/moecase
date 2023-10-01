import Layout from '@/components/Layout';
import { ICase } from '@/models/ICase';
import React, { FC, useEffect, useState } from 'react';
import styles from './CaseScreen.module.scss';
import StockCard from '@/components/StockCard';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useOpenCaseMutation } from '@/redux/services/case';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import CaseScript from '@/services/caseScript';
import { IStock } from '@/models/IStock';
import Image from 'next/image';
import { API_URL } from '@/http';
import RewardCard from '@/components/RewardCard';
import classNames from 'classnames';
import CasePreview from './CasePreview';

type Props = {
  icase: ICase;
};

const CaseScreen: FC<Props> = ({ icase }) => {
  const [openCase, { reset }] = useOpenCaseMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState('');
  const [result, setResult] = useState<Partial<IStock>>({});
  const [isWaiting, setIsWaiting] = useState(false);

  const handleOpenFast = async () => {
    setIsSuccess(false);
    setIsLoading(true);
    await openCase({ id_case: icase.id_case, type: 'fast' })
      .unwrap()
      .then((response) => {
        setIsSuccess(true);
        setResult(response.reward);
        const rewardSound = new Audio('/assets/audio/get-reward.mp3');
        rewardSound.play();
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        setIsError('error');
      });
  };

  const handleOpenScript = async (fillers: IStock[], reward: IStock) => {
    setIsWaiting(true);

    setTimeout(async () => {
      const sound = new Audio('/assets/audio/open-case-sound.mp3');
      sound.play();
      await CaseScript.openCase(fillers, reward).then((_) => {
        setResult(reward);
        const sound = new Audio('/assets/audio/get-reward.mp3');
        sound.play();
        setIsWaiting(false);
      });
    }, 100);
  };

  const handleOpen = async () => {
    setIsSuccess(false);
    setIsLoading(true);
    await openCase({ id_case: icase.id_case, type: 'roll' })
      .unwrap()
      .then((response) => {
        setIsSuccess(true);
        setIsLoading(false);
        handleOpenScript(response.fillers, response.reward);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        setIsError('error');
      });
  };

  const handleRetry = () => {
    setResult({});
    setIsSuccess(false);
    reset();
  };

  return (
    <Layout title={`${icase.name}`}>
      <div className={styles.casePage}>
        <h1 className={styles.casePage__title_main}>
          {icase.name}
          <MdOutlineFavoriteBorder title={'Добавить в избранное'} className={styles.favorite} />
        </h1>
        <div className={styles.unboxArea}>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess && isWaiting ? (
            <div id='unbox-area'>
              <div id='cardList'></div>
              <div className='arrow-down'></div>
              <div className='gradient-shade gradient-shade_left'></div>
              <div className='gradient-shade gradient-shade_right'></div>
              <div></div>
            </div>
          ) : isSuccess ? (
            <>
              <div className={styles.casePage__content}>
                <RewardCard {...result} />
              </div>
              <div className={styles.casePage__buttons}>
                <button onClick={handleRetry}>Открыть еще раз</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.casePage__content}>
                <CasePreview stocks={icase.items} />
              </div>
              <div className={styles.casePage__buttons}>
                <button onClick={handleOpen}>Открыть за {icase.price} руб.</button>
                <button onClick={handleOpenFast}>Открыть быстро</button>
              </div>
            </>
          )}
        </div>
        <h2 className={styles.casePage__title_scope}>Содержимое</h2>
        <div className={styles.scope}>
          {icase.items.map((stock) => (
            <StockCard key={stock.id_stock} stock={stock} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CaseScreen;
