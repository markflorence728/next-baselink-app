"use client";

import { redirect } from "next/navigation";

export default function Logout() {
  fetch("/api/logout");

  redirect("/login");
}
