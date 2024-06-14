import React from "react";
import classNames from "classnames";
import { EmbedItem, UserProfile } from "@/app/_lib/types/user";
import YoutubeView from "./Youtube";
import VimeoView from "./Vimeo";
import FacebookVideoView from "./FacebookVideo";
import SpotifyView from "./Spotify";
import SoundcloudView from "./Soundcloud";
import CalendlyView from "./Calendly";

type Props = {
  profile: UserProfile;
  embeds: EmbedItem[];
};

export default function EmbedsView({ profile, embeds }: Props) {
  if (!embeds.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {embeds.length > 0 && (
        <>
          <YoutubeView profile={profile} embeds={embeds} />
          <VimeoView profile={profile} embeds={embeds} />
          <FacebookVideoView profile={profile} embeds={embeds} />
          <SpotifyView profile={profile} embeds={embeds} />
          <SoundcloudView profile={profile} embeds={embeds} />
          <CalendlyView profile={profile} embeds={embeds} />
        </>
      )}
    </div>
  );
}
