import { ICase } from '@/models/ICase';
import { NextPage } from 'next';
import React from 'react';
import styles from './CaseCard.module.scss';
import { API_URL } from '@/http';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';

const CaseCard: NextPage<ICase> = ({ id_case, name, price, group_id, items }) => {
  return (
    <Link href={'/'} className={styles.card}>
      <div className={classNames(styles.card__stockList, styles.card__stockList_back)}>
        {items.slice(0, 4).map((stock) => (
          <div className={classNames(styles.card__stock, styles.card__stock_back)}>
            <Image src={API_URL + stock.logo} alt={stock.name} objectFit='cover' fill={true} />
          </div>
        ))}
      </div>
      <div className={styles.card__middle}>
        <div className={classNames(styles.card__stockList, styles.card__stockList_front)}>
          {/* {items.length > 3 &&
            items.slice(3, items.length).map((stock) => (
              <div className={classNames(styles.card__stock, styles.card__stock_front)}>
                <Image src={API_URL + stock.logo} alt={stock.name} objectFit='cover' fill={true} />
              </div>
            ))} */}
          {items.slice(0, 4).map((stock) => (
            <div className={classNames(styles.card__stock, styles.card__stock_front)}>
              <Image src={API_URL + stock.logo} alt={stock.name} objectFit='cover' fill={true} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.card__front}>
        <h4 className={styles.card__front__title}>{name}</h4>
        <p className={styles.card__front__price} data-text={price}>
          {price} ₽
        </p>
      </div>
    </Link>
  );
};

export default CaseCard;
