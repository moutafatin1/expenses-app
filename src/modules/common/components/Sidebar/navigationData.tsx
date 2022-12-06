import { AiFillHome, AiOutlineTransaction } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

export const sidebarNavigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <AiFillHome />,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: <BiCategory />,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <AiOutlineTransaction />,
  },
];
