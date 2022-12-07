import { Listbox, Transition } from "@headlessui/react";
import { Spinner } from "@modules/common/components/Elements";
import type { Category } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { Fragment } from "react";
import { HiCheck, HiSelector } from "react-icons/hi";

type CategoriesListBoxProps = {
  category: Partial<Category>;
  setCategory: (category?: Category) => void;
  defaultCategory?: Category;
};

export const CategoriesListBox = ({
  setCategory,
  category,
  defaultCategory,
}: CategoriesListBoxProps) => {
  const { data, error, isLoading } = trpc.category.all.useQuery(undefined, {
    onSuccess(data) {
      setCategory(defaultCategory ? defaultCategory : data.categories[0]);
    },
  });

  if (isLoading)
    return (
      <Spinner
        show={isLoading}
        delay={400}
        className="mx-auto text-7xl text-purple-500"
      />
    );
  if (error) return <p>{error.message}</p>;
  return (
    <Listbox value={category} onChange={setCategory} name="category">
      <div className="relative z-10 mt-1">
        <label className="text-sm font-medium capitalize text-gray-700">
          Category
        </label>

        <Listbox.Button className="relative mt-1 w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-gray-800 focus:outline-none focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-opacity-75  focus-visible:ring-offset-violet-300 sm:text-sm">
          <span className="block truncate text-base text-gray-800">
            {category.emoji} {category.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.categories.map((category) => (
              <Listbox.Option
                key={category.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-violet-100 text-violet-500" : "text-gray-900"
                  }`
                }
                value={category}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {category.emoji} {category.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
