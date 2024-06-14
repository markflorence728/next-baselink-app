"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ImageItem, Section } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  section: Section;
  images: ImageItem[];
};

export default function TableBody({ section, images: _images }: Props) {
  const [images, setImages] = useState<Partial<ImageItem>[]>([..._images]);

  const handleAddNew = () => {
    setImages((prevImages) => [...prevImages, {}]);
  };

  const handleSave = (index: number, newItem: ImageItem) => {
    setImages((prevImages) => {
      return prevImages.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      if (index > -1 && index < newImages.length) {
        newImages.splice(index, 1);
      }
      return newImages;
    });
  };

  return (
    <tbody>
      {images
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            section={section}
            image={item}
            key={item.title}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      {images.length < 50 && (
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
      )}
    </tbody>
  );
}
