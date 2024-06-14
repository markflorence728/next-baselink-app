"use client";

import { ProductItem, Section } from "@/app/_lib/types/user";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props = {
  section: Section;
  products: ProductItem[];
};

export default function Products({ section, products }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className="font-bold">Products</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <TableBody section={section} products={products} />
      </table>
    </div>
  );
}
