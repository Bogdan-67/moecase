import React, { FC, useEffect, useState } from 'react';
import styles from './CaseScreen.module.scss';
import { IStock } from '@/models/IStock';
import Image from 'next/image';
import { API_URL } from '@/http';
import classNames from 'classnames';

type Props = {
  stocks: IStock[];
};

const CasePreview: FC<Props> = ({ stocks }) => {
  const [previewArray, setPreviewArray] = useState<IStock[]>([]);

  useEffect(() => {
    if (stocks && stocks.length > 0) {
      let arr = stocks.slice(0, 5);
      const firstElement = arr.shift() as IStock;
      arr.splice(Math.floor(arr.length / 2), 0, firstElement);
      setPreviewArray(arr);
    }
  }, [stocks]);
  return (
    <div className={styles.preview}>
      <div className={styles.preview__ellipsis}></div>
      {previewArray.map((stock, index) => (
        <div
          key={stock.id_stock}
          className={classNames(
            styles.preview__stock,
            { [styles.preview__stock_first]: index === 2 },
            { [styles.preview__stock_second]: index === 1 || index === 3 },
            { [styles.preview__stock_third]: index === 0 || index === 4 },
            { [styles.preview__stock_right]: index === 3 || index === 4 },
            { [styles.preview__stock_left]: index === 0 || index === 1 },
          )}>
          <Image src={API_URL + stock.logo} alt={stock.name} fill={true} objectFit='cover' />
        </div>
      ))}
    </div>
  );
};

export default CasePreview;
