"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();
  const route = pathname === "/" ? "/curriculum" : "/";
  const title = pathname === "/" ? "Currículo" : "Voltar";

  return (
    <header>
      <Link
        href={route}
        className="bg-slate-100 p-1 rounded-md absolute top-4 right-4"
      >
        {title}
      </Link>
    </header>
  );
}
