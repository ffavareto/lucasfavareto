export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="text-slate-50 bg-green-400 p-2 fixed w-full bottom-0">
        <p className="text-xs text-center">Lucas Santos - {year}</p>
      </footer>
    </>
  );
}
