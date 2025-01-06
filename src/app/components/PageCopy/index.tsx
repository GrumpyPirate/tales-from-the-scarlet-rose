'use client';

import React, { useContext } from 'react';

import { PageContext } from '@/app/contexts/PageContext';

import classNames from './index.module.css';

export default function PageCopy() {
  const { currentPage } = useContext(PageContext);

  return !currentPage?.content ? null : (
    <div className={classNames['content']}>
      <div className={classNames['content__copy']}>{currentPage.content}</div>
    </div>
  );
}
