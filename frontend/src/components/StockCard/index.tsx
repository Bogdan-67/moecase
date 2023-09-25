import React, { FC } from 'react';
import styles from './StockCard.module.scss';
import { IStock } from '@/models/IStock';
import Image from 'next/image';
import { API_URL } from '@/http';

type Props = {
  stock: IStock;
};

const StockCard: FC<Props> = ({ stock }) => {
  return (
    <div className={styles.stock}>
      <Image src={API_URL + stock.logo} alt={stock.name} fill={true} objectFit='cover' />
      <p className={styles.stock__name}>{stock.name}</p>
      <span className={styles.stock__price}>{stock.price} ₽</span>
    </div>
  );
};

export default StockCard;
