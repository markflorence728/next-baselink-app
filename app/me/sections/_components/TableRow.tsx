"use client";

import { useCallback, useState } from "react";
import { FaRegTrashCan, FaEllipsis } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Select, TextInput } from "@/app/_lib/components/Form";
import { Section } from "@/app/_lib/types/user";

const priorityOptions = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
  (item) => ({
    value: item,
    label: item,
  })
);

type Props = {
  index: number;
  section: Partial<Section>;
  onSave: (index: number, item: Section) => void;
  onDelete: (index: number) => void;
};

export default function TableRow({
  index,
  section: _section,
  onSave,
  onDelete,
}: Props) {
  const router = useRouter();
  const [section, setSection] = useState<Partial<Section>>({
    ..._section,
  });

  const handleSave = useCallback(async () => {
    let formInvalidMessage = "";
    if (!section.title) {
      formInvalidMessage += "\nThe title field is required\n";
    }
    if (formInvalidMessage) {
      alert(formInvalidMessage);
      return;
    }

    const response = section.id
      ? await fetch(`/api/users/sections/${section.id}`, {
          method: "PATCH",
          body: JSON.stringify(section),
        })
      : await fetch(`/api/users/sections/`, {
          method: "POST",
          body: JSON.stringify(section),
        });
    const data = await response.json();
    if (response.status === 200) {
      alert("Success!");
      onSave(index, data);
    } else {
      console.log(data.message);
      alert(`Error: ${data.message}`);
    }
  }, [index, onSave, section]);

  const handleDelete = useCallback(async () => {
    if (section.id) {
      const deleteConfirmed = confirm(
        "Are you sure you want to delete this item?"
      );
      if (deleteConfirmed) {
        const response = await fetch(`/api/users/sections/${section.id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.status === 200) {
          alert("Success!");
          onDelete(index);
        } else {
          console.log(data.message);
          alert(`Error: ${data.message}`);
        }
      }
    } else {
      onDelete(index);
    }
  }, [index, onDelete, section]);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 align-top">
        <TextInput
          name={"title"}
          label={""}
          defaultValue={section.title}
          onChange={(e) => {
            setSection((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <Select
          name={"priority"}
          label={""}
          defaultValue={section.priority?.toString()}
          options={priorityOptions}
          onChange={(e) => {
            setSection((prev) => ({
              ...prev,
              priority: e.target.value ? parseInt(e.target.value) : null,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSave}
        >
          {section.id ? "Save" : "Create"}
        </button>

        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleDelete}
        >
          <FaRegTrashCan size={16} />
        </button>

        {section.id && (
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => router.push(`/me/sections/${section.id}`)}
          >
            <FaEllipsis size={16} />
          </button>
        )}
      </td>
    </tr>
  );
}
