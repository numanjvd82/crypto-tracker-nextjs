"use client";

import { Input } from "@/components/ui/input";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";

export default function Navbar() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  return (
    <nav
      className="flex justify-between items-center mx-2 h-16 bg-white text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <Image src={logo} width={40} height={40} alt="Logo" />

      <div>
        <Input
          placeholder="Search coins"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
        />
      </div>
    </nav>
  );
}
