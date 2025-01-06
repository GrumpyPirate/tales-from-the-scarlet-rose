'use client';

import { useContext } from 'react';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import cls from 'classnames';

import { PageContext } from '@/app/contexts/PageContext';

import classNames from './index.module.css';

export default function PageNavigation() {
  const { goToPrevPage, goToNextPage, prevPage, nextPage } =
    useContext(PageContext);

  return (
    <nav className={classNames['nav']}>
      <button
        className={cls(
          classNames['nav__button'],
          classNames['nav__button--prev'],
        )}
        type="button"
        onClick={goToPrevPage}
        aria-label="Previous page"
        disabled={!prevPage}
      >
        <ArrowBigLeftDash /> Prev
      </button>
      <button
        className={cls(
          classNames['nav__button'],
          classNames['nav__button--next'],
        )}
        type="button"
        onClick={goToNextPage}
        aria-label="Next page"
        disabled={!nextPage}
      >
        Next
        <ArrowBigRightDash />
      </button>
    </nav>
  );
}
