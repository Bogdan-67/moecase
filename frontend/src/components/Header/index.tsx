import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineRise, AiOutlineAudit, AiOutlineUser } from 'react-icons/ai';
import { SelectAccount, SelectUser } from '@/redux/slices/authSlice';
import { useTypedSelector } from '@/hooks/redux';
import Modal from '@/components/Modal';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegistrForm';

type Props = {
  type: string;
};

const HeaderItems = [
  {
    icon: () => {
      return <AiOutlineRise />;
    },
    title: 'Апгрейд',
    link: '/upgrade',
  },
  {
    icon: () => {
      return <AiOutlineAudit />;
    },
    title: 'Контракты',
    link: '/contracts',
  },
];

const Header: NextPage<Props> = ({ type }) => {
  const { isAuth } = useTypedSelector(SelectAccount);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [authType, setAuthType] = useState<string>('login');
  const { username, balance } = useTypedSelector(SelectUser);

  const handleLogin = () => {};

  return (
    <section className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>MOECASE</Link>
      </div>
      <ul className={styles.navbar}>
        {type === 'user' &&
          HeaderItems.map((navitem, index) => (
            <Link key={index} href={navitem.link} className={styles.navbar__item}>
              <span className={styles.navbar__item__icon}>{navitem.icon()}</span>
              {navitem.title}
            </Link>
          ))}
      </ul>
      <div className={styles.user}>
        {isAuth ? (
          <>
            <div className={styles.user__avatar}>
              <Image
                objectFit='cover'
                src={
                  'https://imageio.forbes.com/specials-images/imageserve/563a33fde4b0ffa7afe6b110/0x0.jpg?format=jpg&amp;width=1200'
                }
                alt=''
                fill={true}
              />
            </div>
            <div className={styles.user__content}>
              <span className={styles.green}>Привет,</span>
              <span>{username}!</span>
              {type === 'user' && (
                <div className={styles.user__content__balance}>
                  Счет: <span className={styles.green}>{balance} ₽</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <button onClick={() => setIsOpenLogin(true)} className={styles.user__login}>
            <AiOutlineUser />
            <p>Войти</p>
          </button>
        )}
      </div>
      <Modal isActive={isOpenLogin} setIsActive={setIsOpenLogin}>
        <>
          {authType === 'login' ? (
            <div className={styles.auth}>
              <LoginForm />
              <p className={styles.auth__text}>
                Нет аккаунта?&nbsp;{' '}
                <small className={styles.auth__link} onClick={() => setAuthType('registation')}>
                  Зарегистрироваться
                </small>
              </p>
            </div>
          ) : (
            <div className={styles.auth}>
              <RegisterForm />
              <p className={styles.auth__text}>
                Уже есть аккаунт?&nbsp;{' '}
                <small className={styles.auth__link} onClick={() => setAuthType('login')}>
                  Войти
                </small>
              </p>
            </div>
          )}
        </>
      </Modal>
    </section>
  );
};

export default Header;
