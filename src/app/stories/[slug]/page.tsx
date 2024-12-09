import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const reader = createReader(process.cwd(), keystaticConfig);

import classNames from './index.module.css';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const story = await reader.collections.stories.read(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className={classNames['page']}>
      <div className={classNames['image']}>
        <Image
          src={story.image as string}
          alt="The cover image for the story"
          fill
        />
      </div>
    </div>
  );
}
