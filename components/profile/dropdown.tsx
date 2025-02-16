"use client";

import * as React from "react";

export default function Dropdown({
  value,
  enums,
  setter,
}: {
  value: string;
  enums: string[];
  setter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const filteredItems = enums.filter((item: string) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative w-[140px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border p-2 text-sm"
      >
        {value || "Select an item..."}
        <span>▼</span>
      </button>
      {open && (
        <div className="absolute mt-1 w-full rounded border bg-teal-500 shadow-lg">
          <input
            type="text"
            placeholder="Search items..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border-b p-2"
          />
          <div className="max-h-40 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setter(item);
                  setOpen(false);
                }}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
