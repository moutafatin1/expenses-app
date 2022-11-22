import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} isOpen={isOpen} />
      <main className="ml-72">ccccc</main>
    </div>
  );
};

export default DashboardPage;
