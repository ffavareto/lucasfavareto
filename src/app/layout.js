import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <Nav />
        <main className="p-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
