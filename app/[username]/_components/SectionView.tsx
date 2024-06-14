"use client";

import { Section, UserProfile } from "@/app/_lib/types/user";
import { Tooltip } from "react-tooltip";
import ButtonsView from "./Buttons";
import ImagesView from "./Images";
import ProductsView from "./Products";
import EmbedsView from "./Embeds";


type Props = {
  profile: UserProfile;
  section: Section;
};

export default function SectionView({ profile, section }: Props) {
  return (
    <div
      className="flex flex-col py-4 border-b"
      style={{ borderColor: profile.text_color }}
    >
      <p
        className="text-2xl font-bold mb-2 text-ellipsis whitespace-nowrap overflow-hidden"
        data-tooltip-id={`section-${section.id}`}
      >
        {section?.title}
      </p>
      <Tooltip
        id={`section-${section.id}`}
        className="max-w-xl"
        content={section.title}
      />

      <div className="flex flex-col gap-5">
        {section.buttons?.length > 0 && (
          <ButtonsView profile={profile} buttons={section.buttons} />
        )}
        {section.images?.length > 0 && (
          <ImagesView profile={profile} images={section.images} />
        )}
        {section.products?.length > 0 && (
          <ProductsView profile={profile} products={section.products} />
        )}
        {section.embeds?.length > 0 && (
          <EmbedsView profile={profile} embeds={section.embeds} />
        )}
      </div>
    </div>
  );
}
