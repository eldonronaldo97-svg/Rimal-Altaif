interface Props {
  children: React.ReactNode;
  cols?: 2 | 3;
}

export default function FormRow({
  children,
  cols = 2,
}: Props) {
  return (
    <div
      className={`grid gap-4 ${
        cols === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}