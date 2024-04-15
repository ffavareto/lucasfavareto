export default function Title({ children }) {
  return (
    <>
      <h1 className="bg-slate-100 w-fit text-slate-800 p-3 pb-2.5 leading-[0] font-bold text-xs md:text-base">
        {children.toUpperCase()}
      </h1>
    </>
  );
}
