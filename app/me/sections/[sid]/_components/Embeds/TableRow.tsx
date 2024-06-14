"use client";

import { useCallback, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Select, TextArea, TextInput } from "@/app/_lib/components/Form";
import { EmbedItem, EmbedSize, EmbedType, Section } from "@/app/_lib/types/user";

const priorityOptions = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
  (item) => ({
    value: item,
    label: item,
  })
);

const sizeOptions = ["Medium", "Large"].map((item) => ({
  value: item,
  label: item,
}));

const typeOptions = [
  "",
  "YouTube",
  "Vimeo",
  "Facebook Video",
  "Spotify",
  "Soundcloud",
  "Calendly",
].map((item) => ({
  value: item,
  label: item,
}));

type Props = {
  index: number;
  section: Section;
  embed: Partial<EmbedItem>;
  onSave: (index: number, item: EmbedItem) => void;
  onDelete: (index: number) => void;
};

export default function TableRow({
  index,
  section,
  embed: _embed,
  onSave,
  onDelete,
}: Props) {
  const router = useRouter();
  const [embed, setEmbed] = useState<Partial<EmbedItem>>({
    ..._embed,
  });

  const handleSave = useCallback(async () => {
    let formInvalidMessage = "";
    if (!embed.embed_type) {
      formInvalidMessage += "\nPlease select an embed type\n";
    }
    if (!embed.url) {
      formInvalidMessage += "\nThe url field is required\n";
    }
    if (formInvalidMessage) {
      alert(formInvalidMessage);
      return;
    }

    const response = embed.id
      ? await fetch(`/api/users/sections/${section.id}/embeds/${embed.id}`, {
          method: "PATCH",
          body: JSON.stringify(embed),
        })
      : await fetch(`/api/users/sections/${section.id}/embeds/`, {
          method: "POST",
          body: JSON.stringify(embed),
        });
    const data = await response.json();
    if (response.status === 200) {
      alert("Success!");
      onSave(index, data);
    } else {
      console.log(data.message);
      alert(`Error: ${data.message}`);
    }
  }, [embed, section.id, onSave, index]);

  const handleDelete = useCallback(async () => {
    if (embed.id) {
      const deleteConfirmed = confirm(
        "Are you sure you want to delete this item?"
      );
      if (deleteConfirmed) {
        const response = await fetch(
          `/api/users/sections/${section.id}/embeds/${embed.id}`,
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
  }, [embed.id, section.id, onDelete, index]);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 align-top">
        <Select
          name={"embed_type"}
          label={""}
          defaultValue={embed.embed_type?.toString()}
          options={typeOptions}
          onChange={(e) => {
            setEmbed((prev) => ({
              ...prev,
              embed_type: e.target.value as EmbedType,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <TextInput
          name={"url"}
          label={""}
          defaultValue={embed.url || ""}
          onChange={(e) => {
            setEmbed((prev) => ({
              ...prev,
              url: e.target.value,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <Select
          name={"size"}
          label={""}
          defaultValue={embed.size || EmbedSize.Default}
          options={sizeOptions}
          onChange={(e) => {
            setEmbed((prev) => ({
              ...prev,
              size: e.target.value as EmbedSize,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <Select
          name={"priority"}
          label={""}
          defaultValue={embed.priority?.toString()}
          options={priorityOptions}
          onChange={(e) => {
            setEmbed((prev) => ({
              ...prev,
              priority: e.target.value ? parseInt(e.target.value) : null,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <TextArea
          name={"embed_code"}
          label={""}
          defaultValue={embed.embed_code || ""}
          rows={4}
          onChange={(e) => {
            setEmbed((prev) => ({
              ...prev,
              url: e.target.value,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSave}
        >
          {embed.id ? "Save" : "Create"}
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
