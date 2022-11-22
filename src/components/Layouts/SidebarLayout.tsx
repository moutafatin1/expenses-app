import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";

type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Sidebar closeSidebar={closeSidebar} isOpen={isOpen} />
      <main className="ml-72">{children}</main>
    </>
  );
};
