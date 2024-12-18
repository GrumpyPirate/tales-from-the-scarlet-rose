import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Markdoc from '@markdoc/markdoc';
import React from 'react';

import StoryChapterListItem from '@/app/components/StoryChapterListItem';

import keystaticConfig from '../../../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

import classNames from './index.module.css';

export default async function Page({
  params,
}: {
  params: { storySlug: string };
}) {
  const { storySlug } = await params;
  const story = await reader.collections.stories.read(storySlug);

  if (!story) {
    notFound();
  }

  return (
    <div className={classNames['page']}>
      {/* Image */}
      <div className={classNames['image']}>
        <div className={classNames['image-wrapper']}>
          <Image src={story.image as string} alt="" fill />
        </div>
      </div>
      {/* Content */}
      <div className={classNames['content']}>
        <h1 className={classNames['content__title']}>{story.title}</h1>
        <div className={classNames['content__copy']}>
          {Markdoc.renderers.react(
            Markdoc.transform((await story.summary()).node),
            React,
          )}
        </div>
      </div>
      {/* Chapters */}
      <div className={classNames['chapters']}>
        <h2>Chapters</h2>
        <ul>
          {story.chapters
            .map((chapterSlug) =>
              chapterSlug ? (
                <li key={chapterSlug}>
                  <StoryChapterListItem
                    chapterSlug={chapterSlug}
                    storySlug={storySlug}
                  />
                </li>
              ) : null,
            )
            .filter(Boolean)}
        </ul>
      </div>
    </div>
  );
}
