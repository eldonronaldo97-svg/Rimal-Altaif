interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <h1 className="text-center text-4xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-center text-neutral-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}