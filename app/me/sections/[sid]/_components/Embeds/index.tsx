"use client";

import { EmbedItem, Section } from "@/app/_lib/types/user";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props = {
  section: Section;
  embeds: EmbedItem[];
};

export default function Embeds({ section, embeds }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className="font-bold">Embeds</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <TableBody section={section} embeds={embeds} />
      </table>
    </div>
  );
}
