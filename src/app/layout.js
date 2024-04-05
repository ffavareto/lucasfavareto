import Nav from "./components/nav";
import "./globals.css";

export const metadata = {
  title: "Lucas Santos",
  description: "Desenvolvedor front-end | Angular | TypeScript | Jest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
