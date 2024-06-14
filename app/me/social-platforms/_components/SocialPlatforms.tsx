"use client"

import { SocialPlatform } from "@/app/_lib/types/user";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props = {
  socialPlatforms: SocialPlatform[]
}

export default function SocialPlatforms({ socialPlatforms }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <TableBody socialPlatforms={socialPlatforms} />
      </table>
    </div>
  );
}
