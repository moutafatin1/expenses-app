import { Menu as MenuUI, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

const sortOptions = [
  { title: "Most Used", href: "?sort=usage", name: "usage" },
  { title: "Newest", href: "?sort=new", name: "new" },
];

import { fn } from "@utils/fn";
import Link from "next/link";
import { useRouter } from "next/router";

export const Menu = () => {
  const router = useRouter();
  return (
    <MenuUI as="div" className="relative z-20 inline-block">
      <div className="flex">
        <MenuUI.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <HiChevronDown
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </MenuUI.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuUI.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <MenuUI.Item key={option.name}>
                {({ active }) => (
                  <Link
                    href={option.href}
                    className={fn(
                      router.query["sort"] === option.name
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option.title}
                  </Link>
                )}
              </MenuUI.Item>
            ))}
          </div>
        </MenuUI.Items>
      </Transition>
    </MenuUI>
  );
};
