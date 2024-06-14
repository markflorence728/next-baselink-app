"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { SocialPlatform } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  socialPlatforms: SocialPlatform[];
};

export default function TableBody({ socialPlatforms }: Props) {
  const [platforms, setPlatforms] = useState<Partial<SocialPlatform>[]>([
    ...socialPlatforms,
  ]);

  const handleAddNew = () => {
    setPlatforms((prevPlatforms) => [...prevPlatforms, {}]);
  };

  const handleSave = (index: number, newItem: SocialPlatform) => {
    setPlatforms((prevPlatforms) => {
      return prevPlatforms.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setPlatforms((prevPlatforms) => {
      const newPlatforms = [...prevPlatforms];
      if (index > -1 && index < newPlatforms.length) {
        newPlatforms.splice(index, 1);
      }
      return newPlatforms;
    });
  };

  return (
    <tbody>
      {platforms
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            socialPlatform={item}
            key={item.platform}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      {platforms.length < 14 && (
          <div className="w-full flex items-center justify-center p-4">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddNew}
            >
              <FaPlus />
              New
            </button>
          </div>
      )}
    </tbody>
  );
}
