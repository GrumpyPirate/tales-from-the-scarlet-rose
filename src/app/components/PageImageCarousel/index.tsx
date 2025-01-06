'use client';

import cls from 'classnames';
import Image from 'next/image';
import { useContext } from 'react';

import { PageContext } from '@/app/contexts/PageContext';

import classNames from './index.module.css';

export default function PageImageCarousel() {
  const { currentPageNumber, allPages, prevPageNumber, nextPageNumber } =
    useContext(PageContext);

  return (
    <div className={classNames['carousel']}>
      {allPages.map(({ image }, index) => (
        <div
          className={cls(classNames['slide'], {
            [classNames['slide--prev']]: index + 1 === prevPageNumber,
            [classNames['slide--active']]: index + 1 === currentPageNumber,
            [classNames['slide--next']]: index + 1 === nextPageNumber,
          })}
          key={`page-slide-${image}`}
        >
          <div className={classNames['slide__image']}>
            <Image src={image} alt="" fill />
          </div>
        </div>
      ))}
    </div>
  );
}
