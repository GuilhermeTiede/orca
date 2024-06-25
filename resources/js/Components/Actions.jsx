import {useEffect, useRef, useState, Fragment} from "react";
import { Menu, Transition } from '@headlessui/react';
import { EyeIcon } from '@heroicons/react/20/solid';
import {usePage, Link as InertiaLink} from "@inertiajs/react";

const Actions = ({actions = [], uuid}) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const { props: { checkout_domain } } = usePage();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false);
            }
        }

        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        };
    }, []);

    return (
        <div ref={ref} className="flex justify-items-start">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Gerenciar
                        <EyeIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
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
                    <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {actions.map((action) => (
                                <Menu.Item
                                    key={action.route}
                                >
                                    {({ active }) => {
                                        if (action.isExternal === true) {
                                            return (
                                                <a
                                                    href={route(action.route, [uuid])}
                                                    key={action.route}
                                                    className={`${
                                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    target={action.newWindow === true ? '_blank' : '_self'}
                                                >
                                                    {action.icon}
                                                    {action.label}
                                                </a>
                                            )
                                        }

                                        return (
                                            <InertiaLink
                                                href={route(action.route, [uuid])}
                                                key={action.route}
                                                method={action.route.indexOf('delete') !== -1 ? 'delete' : 'get'}
                                                className={`${
                                                    active ? 'bg-green-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {action.icon}
                                                {action.label}
                                            </InertiaLink>
                                        )
                                    }}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Actions;
