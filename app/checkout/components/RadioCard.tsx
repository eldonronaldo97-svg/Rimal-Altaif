interface RadioCardProps {
  selected: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export default function RadioCard({
  selected,
  title,
  description,
  icon,
  onClick,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-5 text-right transition-all duration-200 ${
        selected
          ? "border-[#1773EA] bg-[#F8FBFF] shadow-sm"
          : "border-[#E5E7EB] bg-white hover:border-[#BFC6CF]"
      }`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          {icon && (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                selected
                  ? "bg-blue-100"
                  : "bg-neutral-100"
              }`}
            >
              {icon}
            </div>
          )}

          <div>

            <h3 className="font-semibold">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-sm text-neutral-500">
                {description}
              </p>
            )}

          </div>

        </div>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            selected
              ? "border-[#1773EA]"
              : "border-neutral-300"
          }`}
        >
          {selected && (
            <div className="h-2.5 w-2.5 rounded-full bg-[#1773EA]" />
          )}
        </div>

      </div>
    </button>
  );
}