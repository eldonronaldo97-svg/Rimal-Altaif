"use client";

interface Props {
  value: string | null;

  onChange: (
    value: string | null
  ) => void;
}

export default function UploadReceipt({
  value,
  onChange,
}: Props) {
  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-5">

      <label
        htmlFor="receipt"
        className="
          flex
          h-44
          cursor-pointer
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-neutral-300
          bg-neutral-50
          transition
          hover:border-black
        "
      >
        {!value ? (
          <div className="text-center">

            <p className="font-semibold">
              Upload Receipt
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              JPG • PNG • WEBP
            </p>

          </div>
        ) : (
          <img
            src={value}
            alt="Receipt"
            className="
              h-full
              w-full
              rounded-2xl
              object-cover
            "
          />
        )}
      </label>

      <input
        id="receipt"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

    </div>
  );
}