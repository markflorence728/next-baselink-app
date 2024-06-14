import React from "react";
import SidebarLayout from "@/app/_lib/layout/SidebarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
