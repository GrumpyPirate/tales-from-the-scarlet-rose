import Link from 'next/link';
import { type Entry } from '@keystatic/core/reader';
import Image from 'next/image';

import keystaticConfig from '../../../keystatic.config';

import classNames from './index.module.css';

export default function HomePageStoryItem({
  slug,
  story: storyEntry,
}: {
  slug: string;
  story: Entry<(typeof keystaticConfig)['collections']['stories']>;
}) {
  return (
    <li className={classNames.item}>
      <Link href={`/stories/${slug}`} className={classNames.link}>
        <div className={classNames.thumbnail}>
          <Image src={storyEntry.image as string} alt="Story thumbnail" fill />
        </div>
        <span>{storyEntry.title}</span>
      </Link>
    </li>
  );
}
