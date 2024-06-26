import { getAllStories } from '@/lib/api';
import Image from 'next/image';

import styles from './page.module.css';

export const generateStaticParams = async () => {
  const allStories = await getAllStories();
  return allStories.map(({ slug }: { slug: string }) => ({ slug }));
};

const StoryPage = ({ params }: { params: { slug: string } }) => (
  <div>A page for a story. This is where the &dquo;chapter selection&dquo; will go.</div>
);

export default StoryPage;
