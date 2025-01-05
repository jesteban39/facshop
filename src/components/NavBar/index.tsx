import Link from 'next/link';

export const NavBar = () => {
  return (
    <div>
      <Link href='/'>home</Link>
      <Link href='/cart'>cart</Link>
    </div>
  );
};
