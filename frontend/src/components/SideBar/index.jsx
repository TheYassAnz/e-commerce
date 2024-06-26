import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from '@heroicons/react/20/solid'
import axios from 'axios'
import { Link } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
export default function SideBar({ children, title }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [subCategories, setSubCategories] = useState([])
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/category`)
            .then((response) => setSubCategories(response.data))
            .catch((error) => console.error(error))
    }, [])

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul
                                            role="list"
                                            className="px-2 py-3 font-medium text-gray-900"
                                        >
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <Link
                                                        to={
                                                            '../' +
                                                            category.name.toLowerCase()
                                                        }
                                                        className="block px-2 py-3"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>

                    <div className="flex items-center">
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                        </Menu>

                        <button
                            type="button"
                            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                        >
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

                <section
                    aria-labelledby="products-heading"
                    className="pb-24 pt-6"
                >
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block">
                            <h3 className="mb-5 text-2xl font-medium">
                                Categories
                            </h3>
                            <ul
                                role="list"
                                className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                            >
                                {subCategories.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            to={
                                                '../' +
                                                category.name.toLowerCase()
                                            }
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </form>

                        {/* Product grid */}
                        <div className="lg:col-span-3">{children}</div>
                    </div>
                </section>
            </div>
        </div>
    )
}
