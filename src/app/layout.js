import "./globals.css";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
