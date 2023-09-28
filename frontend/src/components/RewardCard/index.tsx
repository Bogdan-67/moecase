import React, { FC } from 'react';
import Image from 'next/image';
import { API_URL } from '@/http';
import { IStock } from '@/models/IStock';
import styles from './RewardCard.module.scss';

const RewardCard: FC<Partial<IStock>> = (props) => {
  return (
    <div className={styles.card}>
      <h2>{props.name}</h2>
      <div className={styles.card__img}>
        <Image
          src={API_URL + props.logo}
          alt={props.name ? props.name : ''}
          fill={true}
          objectFit='cover'
        />
      </div>
      <p>{props.price} ₽</p>
    </div>
  );
};

export default RewardCard;
