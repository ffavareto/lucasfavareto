"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();
  const route = pathname === "/" ? "/curriculum" : "/";
  const title = pathname === "/" ? "currículo" : "voltar";

  return (
    <header>
      <Link
        className="bg-slate-100 p-3 pb-2.5 absolute top-4 right-4 leading-[0] font-bold"
        href={route}
      >
        {title.toUpperCase()}
      </Link>
    </header>
  );
}
