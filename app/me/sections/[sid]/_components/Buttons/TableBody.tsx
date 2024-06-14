"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ButtonItem, Section } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  section: Section;
  buttons: ButtonItem[];
};

export default function TableBody({ section, buttons: _buttons }: Props) {
  const [buttons, setButtons] = useState<Partial<ButtonItem>[]>([..._buttons]);

  const handleAddNew = () => {
    setButtons((prevButtons) => [...prevButtons, {}]);
  };

  const handleSave = (index: number, newItem: ButtonItem) => {
    setButtons((prevButtons) => {
      return prevButtons.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setButtons((prevButtons) => {
      const newButtons = [...prevButtons];
      if (index > -1 && index < newButtons.length) {
        newButtons.splice(index, 1);
      }
      return newButtons;
    });
  };

  return (
    <tbody>
      {buttons
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            section={section}
            button={item}
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
