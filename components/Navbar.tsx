"use client";

import logo from "@/public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav
      className="flex justify-between items-center px-2 h-16 bg-white text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <Link href="/">
        <Image
          placeholder="empty"
          priority
          src={logo}
          width={40}
          height={40}
          alt="Logo"
        />
      </Link>

      <div>
        <Search />
      </div>
    </nav>
  );
}
