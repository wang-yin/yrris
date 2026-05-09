import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-start px-8 pb-0 md:justify-between">
      <Link href="/">
        <Image
          src="/logo4.png"
          alt="Logo"
          width={150}
          height={60}
          className="cursor-pointer object-contain"
          priority
        ></Image>
      </Link>

      <div className=""></div>
    </header>
  );
}
