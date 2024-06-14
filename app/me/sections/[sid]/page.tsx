import type { Metadata } from "next";
import { validateToken } from "@/app/_lib/auth";
import { getUserSectionData } from "@/app/_lib/users";
import Buttons from "./_components/Buttons";
import Images from "./_components/Images";
import Products from "./_components/Products";
import Embeds from "./_components/Embeds";

export const metadata: Metadata = {
  title: "Baselink",
};

type Props = {
  params: { sid: number };
};

export default async function SectionsPage({ params: { sid } }: Props) {
  const me = await validateToken();
  const result = await getUserSectionData(sid);
  const section = result.data;

  if (!section) return "Not found sections";

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-ellipsis whitespace-nowrap overflow-hidden">
          {section.title}
        </h2>

        <div className="py-16 flex flex-col gap-8">
          <Buttons section={section} buttons={[...section.buttons]} />
          <Images section={section} images={[...section.images]} />
          <Products section={section} products={[...section.products]} />
          <Embeds section={section} embeds={[...section.embeds]} />
        </div>
      </div>
    </div>
  );
}
