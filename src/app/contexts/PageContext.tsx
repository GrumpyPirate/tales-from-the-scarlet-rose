'use client';

import { createContext, PropsWithChildren, useCallback, useState } from 'react';

type Page = {
  content: React.ReactNode;
  image: string;
};

interface PageContextType {
  currentPage: Page | null;
  prevPage: Page | null;
  nextPage: Page | null;
  currentPageNumber: number;
  prevPageNumber: number | null;
  nextPageNumber: number | null;
  goToPage: (pageNumber: number) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  allPages: Page[];
}

const defaultPageContext = {
  currentPage: null,
  prevPage: null,
  nextPage: null,
  currentPageNumber: 1,
  prevPageNumber: null,
  nextPageNumber: null,
  goToPage: () => undefined,
  goToPrevPage: () => undefined,
  goToNextPage: () => undefined,
  allPages: [],
};

export const PageContext = createContext<PageContextType>(defaultPageContext);

export default function PageContextProvider({
  content,
  children,
}: PropsWithChildren<{
  content: {
    pages: React.ReactNode[];
    pageImages: readonly (string | null)[];
  };
}>) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const { pages = [], pageImages = [] } = content;

  const prevPageNumber = currentPageNumber === 1 ? null : currentPageNumber - 1;
  const nextPageNumber =
    currentPageNumber === pages.length ? null : currentPageNumber + 1;

  const currentPage: Page = {
    content: pages[currentPageNumber - 1],
    image: pageImages[currentPageNumber - 1] as string,
  };
  const prevPage: Page | null = !prevPageNumber
    ? null
    : {
        content: pages[prevPageNumber - 1],
        image: pageImages[prevPageNumber - 1] as string,
      };
  const nextPage: Page | null = !nextPageNumber
    ? null
    : {
        content: pages[nextPageNumber - 1],
        image: pageImages[nextPageNumber - 1] as string,
      };

  const allPages = pages.map((page, index) => ({
    content: page,
    image: pageImages[index] as string,
  }));

  const goToPage = useCallback(
    (pageNo: number | null) => {
      if (!pageNo || pageNo < 1 || pageNo > pages.length) {
        return undefined;
      }

      setCurrentPageNumber(pageNo);
    },
    [pages.length],
  );

  return (
    <PageContext.Provider
      value={{
        currentPage,
        prevPage,
        nextPage,
        currentPageNumber,
        prevPageNumber,
        nextPageNumber,
        goToPage,
        goToPrevPage: () => goToPage(prevPageNumber),
        goToNextPage: () => goToPage(nextPageNumber),
        allPages,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
