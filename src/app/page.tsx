import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

import classNames from './index.module.css';
import HomePageStoryItem from './components/HomePageStoryItem';

const reader = createReader(process.cwd(), keystaticConfig);

const storiesDisplayLimit = 4;

export default async function Page() {
  const stories = await reader.collections.stories.all();

  return (
    <>
      <video className={classNames['bg-video']} autoPlay muted loop>
        <source src="/videos/fire-web.webm" type="video/webm" />
        <source src="/videos/fire-web.mp4" type="video/mp4" />
      </video>
      <div className={classNames['overlay']} role="presentation" />
      <div className={classNames['content']}>
        <h1 className={classNames['content__site-title']}>
          Tales from
          <br /> the Scarlet Rose
        </h1>
        <div className={classNames['content__stories']}>
          <h2 className={classNames['content__stories__title']}>
            Latest stories
          </h2>
          <ul className={classNames['content__stories__list']}>
            {stories.slice(0, storiesDisplayLimit - 1).map((story) => (
              <HomePageStoryItem
                key={story.slug}
                story={story.entry}
                slug={story.slug}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
