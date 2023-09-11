import React from 'react';
import styles from './History.module.scss';
import { NextPage } from 'next';

type Props = {};

const History: NextPage<Props> = (props) => {
  return <section className={styles.track}></section>;
};

export default History;
