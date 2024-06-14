"use client";

import { ImageItem, Section } from "@/app/_lib/types/user";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props = {
  section: Section;
  images: ImageItem[];
};

export default function Images({ section, images }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className="font-bold">Images</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <TableBody section={section} images={images} />
      </table>
    </div>
  );
}
