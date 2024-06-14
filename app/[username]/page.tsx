import React from "react";
import type { Metadata } from "next";
import { BsShareFill, BsBellFill } from "react-icons/bs";
import { getUserData } from "./_libs/helpers";
import ProfileView from "./_components/ProfileView";
import SectionView from "./_components/SectionView";

const defaultBackgroundImage = "/images/background.jpg";

type Props = {
  params: { username: string };
};

export function generateMetadata({ params: { username } }: Props): Metadata {
  return {
    title: `${username} | Baselink`,
  };
}

export default async function Main({ params: { username } }: Props) {
  const result = await getUserData(username);
  const user = result.data;

  if (!result.success) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
        <div>Error</div>
        <div>{result.message}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-0 sm:p-8 "
      style={{
        backgroundImage: `url(${defaultBackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover"
      }}
    >
      <div
        className="w-full sm:w-[620px] p-8 flex flex-col gap-5 rounded-xl"
        style={{
          backgroundColor: user?.userprofile?.background_color || "#000000",
          color: user?.userprofile?.text_color || "#ffffff",
        }}
      >
        <section id="actions" className="flex items-center gap-2">
          <button
            className="px-4 py-2 flex items-center justify-center gap-2 border rounded-lg"
            style={{ borderColor: user?.userprofile?.text_color || "#ffffff" }}
          >
            <BsShareFill size={16} /> Share
          </button>
          <div className="flex-1" />
          <button
            className="px-4 py-2 flex items-center justify-center gap-2 border rounded-lg"
            style={{ borderColor: user?.userprofile?.text_color || "#ffffff" }}
          >
            <BsBellFill size={16} /> Subscribe
          </button>
        </section>
        <ProfileView
          username={user?.username}
          profile={user?.userprofile}
          socialPlatforms={user?.social_platforms}
        />
        <div className="flex flex-col gap-8">
          {user?.sections
            ?.sort((a, b) => (a.priority || 10) - (b.priority || 10))
            ?.map((section) => (
              <SectionView
                profile={user?.userprofile}
                section={section}
                key={section.title}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
