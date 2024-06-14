"use client"

import { Section } from "@/app/_lib/types/user";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props = {
  sections: Section[]
}

export default function Sections({ sections }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <TableBody sections={sections} />
      </table>
    </div>
  );
}
