import Image from 'next/image';
// import styles from './page.module.css';
import { getAllStories } from '@/lib/api';

// export async function generateStaticParams() {
//   const results = await getAllStories();

//   return results.map(({ slug }: { slug: string }) => ({ slug }));
// }

export default async function Home() {
  const { total, items } = await getAllStories();

  return (
    <main>
      <p>No. stories: {total}</p>
      <p>Items: {JSON.stringify(items)}</p>
    </main>
  );
}
