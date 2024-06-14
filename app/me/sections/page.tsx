import type { Metadata } from "next";
import { validateToken } from "@/app/_lib/auth";
import { getUserSectionsData } from "@/app/_lib/users";
import Sections from "./_components/Sections";

export const metadata: Metadata = {
  title: "Baselink",
};

export default async function SectionsPage() {
  const me = await validateToken();
  const result = await getUserSectionsData();
  const sections = result.data;

  if (!sections) return "Not found sections"

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Social Icons
        </h2>

        <div className="py-16">
          <Sections sections={sections} />
        </div>
      </div>
    </div>
  );
}
