import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

export const Header = () => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });

    const location = useLocation();

    const { pathname } = location;

    return (
        <div className="py-4">

            <h3 className="hidden lg:block text-center font-extrabold text-4xl tracking-widest">
                KM DAILY
            </h3>

            <div className="hidden lg:flex items-center justify-between  border-t-2 border-black border-b-2 mt-4 px-4 ">
                <div className="hidden lg:flex items-center">
                    <div className="">
                        <ul className="flex space-x-4 cursor-pointer">
                            <li className="border-r-2 border-black pr-4 py-2">
                                <Link to="/" className={`${pathname === '/' && 'underline'} hover:underline border-black`}>Home</Link>
                            </li>
                            <li className="border-r-2 border-black pr-4 py-2">
                                <Link className={`${pathname === '/about' && 'underline'} hover:underline border-black`} to="/about">About</Link>
                            </li>
                            <li className="border-r-2 border-black pr-4 py-2">
                                <Link className={`${pathname === '/contact' && 'underline'} hover:underline border-black`} to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden lg:flex">
                    <div className="text-sm font-bold">
                        <Link to="/login">
                            Login
                        </Link>
                        <span className='mx-3'>/</span>
                        <Link to="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </div>

            {/* small screen */}

            <div className={`lg:hidden flex justify-between items-center px-3`}>
                <h3 className="font-extrabold text-2xl tracking-widest">
                    KVlog
                </h3>
                <button className="outline-none mobile-menu-button" onClick={() => setOpen(!open)}>
                    <svg className=" w-6 h-6 text-gray-500 hover:text-gray-500 "
                        x-show="!showMenu"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {(open && !isDesktop) && <div className="">
                <ul class="mt-4">
                    <li className="hover:border-t-2 border-black hover:border-b-2"><Link to="/" class="block text-sm px-2 py-4 hover:text-black">Home</Link></li>
                    <li><Link to="/about" class="block text-sm px-2 py-4  hover:text-black">About</Link></li>
                    <li><Link to="/contact" class="block text-sm px-2 py-4 hover:text-black hover:font-bold">Contact</Link></li>
                </ul>
            </div>
            }
        </div>
    )
}
