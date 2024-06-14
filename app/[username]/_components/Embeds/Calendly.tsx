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

export default function CalendlyView({ profile, embeds }: Props) {
  const defaultCalendlies = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Calendly && item.size === EmbedSize.Default
  );

  const largeCalendlies = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Calendly && item.size === EmbedSize.Large
  );

  if (![...defaultCalendlies, ...largeCalendlies].length) return null;

  return (
    <div className="flex flex-col gap-2">
      {defaultCalendlies.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {defaultCalendlies
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`calendly-${item.id}`}
              />
            ))}
        </div>
      )}
      {largeCalendlies.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeCalendlies
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`calendly-${item.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
