"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { Badge } from "../badge/badge";
import { logout } from "@/app/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
    const quantity = useAppSelector((state: RootState) => state.cart.quantity);
    const user = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout");

            if (response.ok) {
                dispatch(logout());
                router.push('/');
            } else {
                console.log('Failed to logout');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <nav data-testid="navbar" className="fixed w-full z-20 top-0 start-0 border-b border-gray-400 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href='/' className="flex items-center space-x-3 rtl:space-x-reverse focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Tengo Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tengo</span>
                </Link>
                <button onClick={handleToggle} data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-blue-600" aria-controls="navbar-solid-bg" aria-expanded={isOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={"w-full md:block md:w-auto " + (isOpen ? null : "hidden")} id="navbar-solid-bg">
                    <ul role="list" className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {user.isAuthenticated && (
                            <>
                                <li role="listitem">
                                    <Link href='/products' onClick={handleToggle} className="block py-2 px-3 md:p-0 focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</Link>
                                </li>
                                <li role="listitem">
                                    <Link href='/cart' onClick={handleToggle} className=" relative inline-flex py-2 px-3 md:p-0 focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{quantity > 0 && <Badge quantity={quantity} />}Cart</Link>
                                </li>
                            </>
                        )}

                        {user.isAuthenticated ? (
                            <li role="listitem" data-testid="user-name">
                                Hi, {user.user?.firstName}
                                <button onClick={() => {
                                    handleToggle();
                                    handleLogout();
                                }}
                                    className="focus:ring-4 focus:outline-none focus:ring-blue-300 ml-2 relative inline-flex py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Sign Out</button>
                            </li>
                        ) : (
                            <li role="listitem">
                                <Link href='/signin' onClick={handleToggle} className="focus:ring-4 focus:outline-none focus:ring-blue-300 relative inline-flex py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign In</Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}




