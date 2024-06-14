import type { Metadata } from "next";
import { validateToken } from "@/app/_lib/auth";
import Profile from "./_components/Profile";
import { getUserData } from "@/app/_lib/users";

export const metadata: Metadata = {
  title: "Baselink",
};

export default async function ProfilePage() {
  const me = await validateToken();
  const user = await getUserData(me.username);
  const userData = user.data;

  if (!userData) return <>Not found user.</>

  return (
    <div className="flex flex-col px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {user.data?.username}
        </h2>

        <div className="py-16">
          <Profile data={userData} />
        </div>
      </div>
    </div>
  );
}
