import Link from 'next/link';
import React from 'react';
import { BiBox, BiListUl, BiDollarCircle } from 'react-icons/bi';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { BsArrowReturnRight } from 'react-icons/bs';

type Props = {};

export const ADMIN_PATH = '/admin';

const SidebarItems = [
  {
    id: 1,
    title: 'Предметы',
    link: '/stocks',
    icon: () => {
      return <BiDollarCircle />;
    },
    parent: null,
  },
  {
    id: 2,
    title: 'Кейсы',
    link: '/cases',
    icon: () => {
      return <BiBox />;
    },
    parent: null,
  },
  {
    id: 3,
    title: 'Группы',
    link: '/groups',
    icon: () => {
      return <BiListUl />;
    },
    parent: null,
  },
  {
    id: 4,
    title: 'Создание',
    link: '/create',
    icon: () => {
      return <BsArrowReturnRight />;
    },
    parent: 1,
  },
  {
    id: 5,
    title: 'Редактирование',
    link: '/edit',
    icon: () => {
      return <BsArrowReturnRight />;
    },
    parent: 1,
  },
];

const AdminSidebar = (props: Props) => {
  const { pathname } = useRouter();

  return (
    <section className={styles.sidebar}>
      {SidebarItems.filter((item) => item.parent === null).map((item) => (
        <>
          <Link
            href={ADMIN_PATH + item.link}
            className={classNames(styles.sidebar__item, {
              [styles.active]: pathname.includes(ADMIN_PATH + item.link),
            })}>
            <span>{item.icon()}</span>
            {item.title}
          </Link>
          {pathname.includes(ADMIN_PATH + item.link) &&
            SidebarItems.filter((child) => child.parent === item.id).map((child) => (
              <Link
                href={ADMIN_PATH + item.link + child.link}
                className={classNames(styles.sidebar__item, styles.sidebar__item__child, {
                  [styles.active]: pathname.includes(child.link),
                })}>
                {pathname.includes(child.link) && <span>{child.icon()}</span>}
                {child.title}
              </Link>
            ))}
        </>
      ))}
    </section>
  );
};

export default AdminSidebar;
