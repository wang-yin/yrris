"use client";

import Link from "next/link";
import WaveDivider from "../ui/WavyDivider";

export default function Navbar() {
  return (
    <>
      <nav className="px-8 py-3 font-(family-name:--font-luoyan) text-2xl">
        <ul className="scrollbar-hide flex items-center justify-start gap-10 overflow-x-auto whitespace-nowrap md:justify-center md:gap-20 lg:gap-50">
          <li className="cursor-pointer">
            <Link href="/">【　首　頁　】</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/article">【　文　章　】</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/profile">【　關　於　】</Link>
          </li>
        </ul>
      </nav>
      <WaveDivider />
    </>
  );
}
