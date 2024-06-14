"use client";

import { Select, TextInput } from "@/app/_lib/components/Form";
import { PlatformKeys, SocialPlatform } from "@/app/_lib/types/user";
import { useCallback, useState } from "react";
import { BsSubstack } from "react-icons/bs";
import {
  FaInstagram,
  FaThreads,
  FaTiktok,
  FaYoutube,
  FaHouse,
  FaLinkedin,
  FaX,
  FaFacebook,
  FaPodcast,
  FaSpotify,
  FaApple,
  FaGithub,
  FaPinterest,
  FaGoogle,
  FaAmazon,
  FaSoundcloud,
  FaMedium,
  FaStackExchange,
  FaRegStar,
  FaYahoo,
  FaGooglePlay,
  FaItunes,
  FaYelp,
  FaRegTrashCan,
} from "react-icons/fa6";

const socialIcons = {
  Instagram: <FaInstagram size={20} />,
  Threads: <FaThreads size={20} />,
  TikTok: <FaTiktok size={20} />,
  YouTube: <FaYoutube size={20} />,
  Website: <FaHouse size={20} />,
  LinkedIn: <FaLinkedin size={20} />,
  X: <FaX size={20} />,
  Facebook: <FaFacebook size={20} />,
  Podcast: <FaPodcast size={20} />,
  Spotify: <FaSpotify size={20} />,
  "Apple Podcasts": <FaApple size={20} />,
  Github: <FaGithub size={20} />,
  Pinterest: <FaPinterest size={20} />,
  "Google Podcasts": <FaGoogle size={20} />,
  "Amazon Music": <FaAmazon size={20} />,
  Soundcloud: <FaSoundcloud size={20} />,
  Substack: <BsSubstack size={18} />,
  Medium: <FaMedium size={20} />,
  "Stack Exchange": <FaStackExchange size={20} />,
  Trustpilot: <FaRegStar size={20} />,
  "Yahoo Finance": <FaYahoo size={20} />,
  "Google Play": <FaGooglePlay size={20} />,
  "Apple Store": <FaApple size={20} />,
  iTunes: <FaItunes size={20} />,
  Yelp: <FaYelp size={20} />,
};

const socialOptions = [
  "",
  "Instagram",
  "Threads",
  "TikTok",
  "YouTube",
  "Website",
  "LinkedIn",
  "X",
  "Facebook",
  "Podcast",
  "Spotify",
  "Apple Podcasts",
  "Github",
  "Pinterest",
  "Google Podcasts",
  "Amazon Music",
  "Soundcloud",
  "Substack",
  "Medium",
  "Stack Exchange",
  "Trustpilot",
  "Yahoo Finance",
  "Google Play",
  "Apple Store",
  "iTunes",
  "Yelp",
].map((item) => ({
  value: item,
  label: item,
}));

const priorityOptions = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
  (item) => ({
    value: item,
    label: item,
  })
);

type Props = {
  index: number;
  socialPlatform: Partial<SocialPlatform>;
  onSave: (index: number, item: SocialPlatform) => void;
  onDelete: (index: number) => void;
};

export default function TableRow({
  index,
  socialPlatform,
  onSave,
  onDelete,
}: Props) {
  const [platform, setPlatform] = useState<Partial<SocialPlatform>>({
    ...socialPlatform,
  });

  const handleSave = useCallback(async () => {
    let formInvalidMessage = "";
    if (!platform.platform) {
      formInvalidMessage += "\nPlease select a social platform\n";
    }
    if (!platform.url) {
      formInvalidMessage += "\nThe url field is required\n";
    }
    if (formInvalidMessage) {
      alert(formInvalidMessage);
      return;
    }

    const response = platform.id
      ? await fetch(`/api/users/platforms/${platform.id}`, {
          method: "PATCH",
          body: JSON.stringify(platform),
        })
      : await fetch(`/api/users/platforms/`, {
          method: "POST",
          body: JSON.stringify(platform),
        });
    const data = await response.json();
    if (response.status === 200) {
      alert("Success!");
      onSave(index, data);
    } else {
      console.log(data.message);
      alert(`Error: ${data.message}`);
    }
  }, [index, onSave, platform]);

  const handleDelete = useCallback(async () => {
    if (platform.id) {
      const deleteConfirmed = confirm(
        "Are you sure you want to delete this item?"
      );
      if (deleteConfirmed) {
        const response = await fetch(`/api/users/platforms/${platform.id}`, {
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
  }, [index, onDelete, platform]);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {platform.platform ? socialIcons[platform.platform] : null}
      </td>
      <td className="px-6 py-4 align-top">
        <Select
          name={"platform"}
          label={""}
          defaultValue={platform.platform}
          options={socialOptions}
          onChange={(e) => {
            setPlatform((prev) => ({
              ...prev,
              platform: e.target.value as PlatformKeys,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 align-top">
        <TextInput
          name={"url"}
          label={""}
          defaultValue={platform.url}
          onChange={(e) => {
            setPlatform((prev) => ({
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
          defaultValue={platform.priority?.toString()}
          options={priorityOptions}
          onChange={(e) => {
            setPlatform((prev) => ({
              ...prev,
              priority: e.target.value ? parseInt(e.target.value) : null,
            }));
          }}
        />
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        <button
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleSave}
        >
          {platform.id ? "Save" : "Create"}
        </button>

        <button
          className="py-2.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleDelete}
        >
          <FaRegTrashCan size={16} />
        </button>
      </td>
    </tr>
  );
}
