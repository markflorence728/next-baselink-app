"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ProductItem, Section } from "@/app/_lib/types/user";
import TableRow from "./TableRow";

type Props = {
  section: Section;
  products: ProductItem[];
};

export default function TableBody({ section, products: _products }: Props) {
  const [products, setProducts] = useState<Partial<ProductItem>[]>([
    ..._products,
  ]);

  const handleAddNew = () => {
    setProducts((prevProducts) => [...prevProducts, {}]);
  };

  const handleSave = (index: number, newItem: ProductItem) => {
    setProducts((prevProducts) => {
      return prevProducts.map((item, i) => (i === index ? newItem : item));
    });
  };

  const handleDelete = (index: number) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (index > -1 && index < newProducts.length) {
        newProducts.splice(index, 1);
      }
      return newProducts;
    });
  };

  return (
    <tbody>
      {products
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((item, index) => (
          <TableRow
            index={index}
            section={section}
            product={item}
            key={item.title}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      {products.length < 14 && (
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
