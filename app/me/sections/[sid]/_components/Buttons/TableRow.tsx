"use client";

import { useCallback, useState } from "react";
import { FaRegTrashCan, FaEllipsis } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Select, TextInput } from "@/app/_lib/components/Form";
import { ButtonItem, Section } from "@/app/_lib/types/user";

const priorityOptions = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
  (item) => ({
    value: item,
    label: item,
  })
);

type Props = {
  index: number;
  section: Section;
  button: Partial<ButtonItem>;
  onSave: (index: number, item: ButtonItem) => void;
  onDelete: (index: number) => void;
};

export default function TableRow({
  index,
  section,
  button: _button,
  onSave,
  onDelete,
}: Props) {
  const router = useRouter();
  const [button, setButton] = useState<Partial<ButtonItem>>({
    ..._button,
  });
  const [file, setFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(
    button.image ?? null
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = useCallback(async () => {
    let formInvalidMessage = "";
    if (!button.title) {
      formInvalidMessage += "\nThe title field is required\n";
    }
    if (formInvalidMessage) {
      alert(formInvalidMessage);
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("title", button.title ?? "");
    dataToSend.append("url", button.url ?? "");
    dataToSend.append("priority", button.priority?.toString() ?? "");
    if (file) {
      dataToSend.append("image", file);
    }

    const response = button.id
      ? await fetch(`/api/users/sections/${section.id}/buttons/${button.id}`, {
          method: "PATCH",
          body: dataToSend,
        })
      : await fetch(`/api/users/sections/${section.id}/buttons/`, {
          method: "POST",
          body: dataToSend,
        });
    const data = await response.json();
    if (response.status === 200) {
      alert("Success!");
      onSave(index, data);
    } else {
      console.log(data.message);
      alert(`Error: ${data.message}`);
    }
  }, [
    button.title,
    button.url,
    button.priority,
    button.id,
    file,
    section.id,
    onSave,
    index,
  ]);

  const handleDelete = useCallback(async () => {
    if (button.id) {
      const deleteConfirmed = confirm(
        "Are you sure you want to delete this item?"
      );
      if (deleteConfirmed) {
        const response = await fetch(
          `/api/users/sections/${section.id}/buttons/${button.id}`,
          {
            method: "DELETE",
          }
        );
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
  }, [button.id, section.id, onDelete, index]);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 align-top">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onImageChange}
          className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
      </td>
      <td className="px-6 py-4 align-top">
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Profile Preview"
            className="mt-2 h-[80px] w-[80px] object-cover rounded-md"
            style={{ width: "80px", height: "80px" }}
            width={80}
            height={80}
          />
        )}
      </td>
      <td className="px-6 py-4 align-top">
        <TextInput
          name={"title"}
          label={""}
          defaultValue={button.title}
          onChange={(e) => {
            setButton((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <TextInput
          name={"url"}
          label={""}
          defaultValue={button.url}
          onChange={(e) => {
            setButton((prev) => ({
              ...prev,
              url: e.target.value,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <Select
          name={"priority"}
          label={""}
          defaultValue={button.priority?.toString()}
          options={priorityOptions}
          onChange={(e) => {
            setButton((prev) => ({
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
          {button.id ? "Save" : "Create"}
        </button>

        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleDelete}
        >
          <FaRegTrashCan size={16} />
        </button>
      </td>
    </tr>
  );
}
