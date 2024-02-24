// componentws/Nav.tsx

import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-center text-xs gap-4 ml-auto mb-10 [&>a]:border-b-2 [&>a:hover]:border-cyan-400">
      <Link href="/">W/ button</Link>
      <Link href="/infinite-scroll">W/ Infinite Scroll</Link>
      <Link href="/infinite-scroll-rio">W/ Infinite Scroll w/ RIO</Link>
    </nav>
  );
};

export default Nav;
