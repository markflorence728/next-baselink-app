"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { EmbedItem, Section } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  section: Section;
  embeds: EmbedItem[];
};

export default function TableBody({ section, embeds: _embeds }: Props) {
  const [embeds, setEmbeds] = useState<Partial<EmbedItem>[]>([..._embeds]);

  const handleAddNew = () => {
    setEmbeds((prevEmbeds) => [...prevEmbeds, {}]);
  };

  const handleSave = (index: number, newItem: EmbedItem) => {
    setEmbeds((prevEmbeds) => {
      return prevEmbeds.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setEmbeds((prevEmbeds) => {
      const newEmbeds = [...prevEmbeds];
      if (index > -1 && index < newEmbeds.length) {
        newEmbeds.splice(index, 1);
      }
      return newEmbeds;
    });
  };

  return (
    <tbody>
      {embeds
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            section={section}
            embed={item}
            key={item.url}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}

      <div className="w-full flex p-4">
        <button
          type="button"
          className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleAddNew}
        >
          <FaPlus />
          New
        </button>
      </div>
    </tbody>
  );
}
