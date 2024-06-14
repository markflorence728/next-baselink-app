import classNames from "classnames";
import Image from "next/image";
import { ButtonItem, UserProfile } from "@/app/_lib/types/user";
import { Tooltip } from "react-tooltip";

function ButtonItemView({
  profile,
  button,
}: {
  profile: UserProfile;
  button: ButtonItem;
}) {
  const hasImage = !!button.image;

  return (
    <a href={button.url} rel="noopener noreferrer">
      <button
        className={classNames(
          "w-full sm:w-[550px] h-[110px] p-0 text-lg rounded-md",
          hasImage && "flex items-center"
        )}
        style={{
          background: profile.button_color,
          color: profile.button_text_color,
        }}
      >
        {hasImage && (
          <Image
            className="rounded-l-md object-cover w-[110px] h-[110px]"
            src={button.image}
            alt={button.title}
            width={110}
            height={110}
          />
        )}
        <div
          className={classNames(
            "flex-1 px-4 line-clamp-2 text-ellipsis whitespace-nowrap overflow-hidden",
            hasImage ? "text-left" : "text-center"
          )}
          data-tooltip-id={`button-${button.id}`}
        >
          {button.title}
        </div>
        <Tooltip
          id={`button-${button.id}`}
          className="max-w-xl"
          content={button.title ?? ""}
        />
      </button>
    </a>
  );
}

type Props = {
  profile: UserProfile;
  buttons: ButtonItem[];
};

export default function ButtonsView({ profile, buttons }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {buttons
        .sort((a, b) => (a.priority || 10) - (b.priority || 10))
        .map((button) => (
          <ButtonItemView
            profile={profile}
            button={button}
            key={`button-${button.id}`}
          />
        ))}
    </div>
  );
}
