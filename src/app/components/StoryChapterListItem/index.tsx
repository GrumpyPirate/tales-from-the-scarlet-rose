import { createReader } from '@keystatic/core/reader';

import keystaticConfig from '../../../../keystatic.config';

import classNames from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function StoryChapterListItem({
  storySlug,
  chapterSlug,
}: {
  storySlug: string;
  chapterSlug: string;
}) {
  const chapter = await reader.collections.chapters.read(chapterSlug);

  if (!chapter) {
    return null;
  }

  return (
    <Link
      href={`/stories/${storySlug}/chapter/${chapterSlug}`}
      className={classNames['item']}
    >
      <div className={classNames['image']}>
        <Image src={chapter.image as string} alt="" fill />
      </div>
      <h3 className={classNames['title']}>{chapter.title}</h3>
    </Link>
  );
}
