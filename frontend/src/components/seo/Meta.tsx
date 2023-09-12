import React, { FC, PropsWithChildren } from 'react';
import { IMeta } from './IMeta';
import Head from 'next/head';

const getTitle = (title: string) => `${title} | Moecase`;

const Meta: FC<PropsWithChildren<IMeta>> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        <meta name='og:title' content={getTitle(title)} />
        {description ? (
          <>
            <meta name='description' content={description} />
            <meta name='og:description' content={description} />
          </>
        ) : (
          <>
            <meta name='robots' content='noindex, nofollow' />
          </>
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
