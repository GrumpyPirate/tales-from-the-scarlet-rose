import { createReader, type Entry } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdoc, { type Node } from '@markdoc/markdoc';

import PageImageCarousel from '@/app/components/PageImageCarousel';
import PageContextProvider from '@/app/contexts/PageContext';
import PageNavigation from '@/app/components/PageNavigation';
import PageCopy from '@/app/components/PageCopy';

import keystaticConfig from '../../../../../../keystatic.config';

import classNames from './index.module.css';

const reader = createReader(process.cwd(), keystaticConfig);

interface PageParams {
  chapterSlug: string;
  storySlug: string;
}

const extractPages = ({ children }: Node) =>
  children.reduce(
    (accAllPages, currNode) => {
      if (currNode.type === 'hr') {
        return [...accAllPages, []];
      }

      const currPage = accAllPages[accAllPages.length - 1];
      return [...accAllPages.slice(0, -1), [...currPage, currNode]];
    },
    [[]] as Node[][],
  );

/**
 * Generate static params for all story/chapter combos. E.g.
 *  [
 *    { storySlug: 'molly-the-spider', chapterSlug: 'chapter-01' },
 *    { storySlug: 'molly-the-spider', chapterSlug: 'chapter-02' },
 *    { storySlug: 'barras-the-bastard', chapterSlug: 'chapter-01' },
 *    { storySlug: 'barras-the-bastard', chapterSlug: 'chapter-02' },
 *    { storySlug: 'barras-the-bastard', chapterSlug: 'chapter-03' },
 *    { storySlug: 'barras-the-bastard', chapterSlug: 'chapter-04' },
 *  ]
 *
 * ...etc.
 */
export async function generateStaticParams() {
  const stories: {
    slug: string;
    entry: Entry<(typeof keystaticConfig)['collections']['stories']>;
  }[] = await reader.collections.stories.all();

  return stories.reduce(
    (accSlugs, story) => [
      ...accSlugs,
      ...story.entry.chapters.map((chapterSlug) => ({
        storySlug: story.slug,
        chapterSlug: chapterSlug as string,
      })),
    ],
    [] as PageParams[],
  );
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { chapterSlug } = await params;
  const chapter = await reader.collections.chapters.read(chapterSlug);

  if (!chapter) {
    notFound();
  }

  const { content, pageImages } = chapter;

  const renderedPages = extractPages((await content()).node).map((page) =>
    Markdoc.renderers.react(Markdoc.transform(page), React),
  );

  return (
    <PageContextProvider content={{ pages: renderedPages, pageImages }}>
      <div className={classNames['page']}>
        <PageImageCarousel />
        <div className={classNames['page__navigation']}>
          <PageNavigation />
        </div>
        <div className={classNames['page__copy']}>
          <PageCopy />
        </div>
      </div>
    </PageContextProvider>
  );
}
