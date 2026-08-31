"use client";

import { useState } from "react";

type Props = {
  onAdd: () => void;
  disabled?: boolean;
};

export const AddToCartButton = ({ onAdd, disabled }: Props) => {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAdd();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 font-semibold text-black transition ${
        added ? "bg-[#f2e7cf] motion-safe:animate-add-bounce" : "bg-[#e8d9b8]"
      } ${disabled ? "cursor-not-allowed opacity-50" : "active:scale-95"}`}
    >
      {added ? (
        <>
          <span>✓</span>
          Added
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};
