"use client"

import * as React from "react"
import { ChevronDown, Search } from "lucide-react"

export default function Dropdown({
  value,
  enums,
  setter,
}: {
  value: string
  enums: string[]
  setter: React.Dispatch<React.SetStateAction<string>>
}) {
  const [open, setOpen] = React.useState(false)
  const [filter, setFilter] = React.useState("")

  const filteredItems = enums.filter((item: string) => item.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1F2C] p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2A2F3C]"
        type="button"
      >
        {value || "Select an item..."}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1F2C] shadow-lg">
          <div className="flex items-center border-b border-gray-300 dark:border-gray-600 p-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Search items..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-transparent p-0 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setter(item)
                  setOpen(false)
                }}
                className="cursor-pointer p-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#5B9BF3] hover:text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

