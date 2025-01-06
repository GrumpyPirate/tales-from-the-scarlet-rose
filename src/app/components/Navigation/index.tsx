import Image from 'next/image';
import Link from 'next/link';

import classNames from './index.module.css';
// import roseLogo from './rose-3.svg';
import crossedSabres from './crossed-sabres.svg';

export default function Navigation() {
  return (
    <nav className={classNames['nav']}>
      <Link href="/">Home</Link>
      <Link href="/" className={classNames['nav__logo']}>
        <Image src={crossedSabres} alt="Tales from the Scarlet Rose" />
      </Link>
      <Link href="/stories">Stories</Link>
    </nav>
  );
}
