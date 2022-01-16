export default function Loading(): JSX.Element {
  return (
    <div
      className={[
        "flex w-full h-full items-center justify-center",
        "text-red-700 text-lg",
      ].join(" ")}
    >
      We are loading, please wait...
    </div>
  );
}
