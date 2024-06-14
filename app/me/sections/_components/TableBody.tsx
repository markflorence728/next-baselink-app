"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Section } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  sections: Section[];
};

export default function TableBody({ sections: _sections }: Props) {
  const [sections, setSections] = useState<Partial<Section>[]>([
    ..._sections,
  ]);

  const handleAddNew = () => {
    setSections((prevSections) => [...prevSections, {}]);
  };

  const handleSave = (index: number, newItem: Section) => {
    setSections((prevSections) => {
      return prevSections.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      if (index > -1 && index < newSections.length) {
        newSections.splice(index, 1);
      }
      return newSections;
    });
  };

  return (
    <tbody>
      {sections
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            section={item}
            key={item.title}
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
