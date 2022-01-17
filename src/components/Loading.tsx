export default function Loading(): JSX.Element {
  return (
    <div
      className={[
        "fixed top-0 left-0 bg-slate-300 bg-opacity-80 z-30",
        "flex w-full h-full items-center justify-center",
        "text-red-700 text-lg",
      ].join(" ")}
    >
      We are loading, please wait...
    </div>
  );
}
