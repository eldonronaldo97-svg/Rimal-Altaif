"use client";

interface Props {
  title: string;
  subtitle?: string;

  checked: boolean;

  onClick: () => void;
}

export default function RadioCard({
  title,
  subtitle,
  checked,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-5
        text-left
        transition
        ${
          checked
            ? "border-black bg-neutral-50"
            : "border-neutral-300 hover:border-neutral-400"
        }
      `}
    >
      <div className="flex items-start justify-between">

        <div>

          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 text-sm text-neutral-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`
            mt-1
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border-2
            ${
              checked
                ? "border-black"
                : "border-neutral-400"
            }
          `}
        >
          {checked && (
            <div className="h-3 w-3 rounded-full bg-black" />
          )}
        </div>

      </div>
    </button>
  );
}