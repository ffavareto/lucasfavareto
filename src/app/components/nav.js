import Link from "next/link";

export default function Nav() {
  return (
    <>
      <header className="bg-green-400 p-2">
        <nav className="text-slate-50 flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/contact">Contato</Link>
          <Link href="/experience">Experiência</Link>
        </nav>
      </header>
    </>
  );
}
