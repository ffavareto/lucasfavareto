import Link from "next/link";

export default function Nav() {
  const routes = [
    { pathname: "/", title: "início" },
    { pathname: "/curriculum", title: "currículo" },
    { pathname: "/certifications", title: "certificados" },
  ];

  return (
    <header className="flex gap-2 p-2 justify-end">
      {routes.map((route, i) => {
        return (
          <Link
            className="bg-slate-100 p-3 pb-2.5 leading-[0] font-bold"
            href={route.pathname}
            key={i}
          >
            {route.title}
          </Link>
        );
      })}
    </header>
  );
}
