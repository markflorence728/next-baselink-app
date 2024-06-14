import React from "react";
import classNames from "classnames";
import {
  EmbedItem,
  EmbedSize,
  EmbedType,
  UserProfile,
} from "@/app/_lib/types/user";

type Props = {
  profile: UserProfile;
  embeds: EmbedItem[];
};

export default function SoundcloudView({ profile, embeds }: Props) {
  const defaultSoundclouds = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Soundcloud && item.size === EmbedSize.Default
  );

  const largeSoundclouds = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Soundcloud && item.size === EmbedSize.Large
  );

  if (![...defaultSoundclouds, ...largeSoundclouds].length) return null;

  return (
    <div className="flex flex-col gap-2">
      {defaultSoundclouds.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {defaultSoundclouds
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`soundcloud-${item.id}`}
              />
            ))}
        </div>
      )}
      {largeSoundclouds.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeSoundclouds
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`soundcloud-${item.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
