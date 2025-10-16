"use client"

import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin, FaSpotify } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import dynamic from "next/dynamic";

const MapFooter = dynamic(() => import("./MapFooter"), { ssr: false });

const Footer = () => {
    return (
        <div className="w-full px-15 py-5 pb-10 border-t border-gray-300 bg-white">
            <footer className="flex flex-col gap-15">
                <div className="flex gap-10 items-center">
                    <p className="text-2xl font-bold text-[#131369]">Deepsea</p>
                    <p className="text-xl font-semibold text-[#16162d]">The Best Product For You</p>
                </div>
                <div className="flex flex-wrap justify-between w-11/12">
                    <div className="flex flex-col">
                        <div className="mb-3">
                            <p className="font-semibold my-2">PT Deepsea Nusantara</p>
                            <p className="text-[#535353]">Integrated fishing company. Our mission is<br/>
                                to make the sea a better source of livelihood <br/>
                                for all by creating a fair and sustainable<br/>
                                fishing ecosystem.</p>
                        </div>
                    </div>
                        <div className="mb-3">
                            <p className="font-semibold my-2">Main Office</p>
                            <p className="text-[#535353]">AD Premiere Office Park, 19th floor Road TB <br/>
                                Simatupang No.5, RT.5/RW.7, Ragunan, Kec. Ps. <br/>
                                Minggu, South Jakarta City, Special Capital <br/>
                                Region Jakarta 12540</p>
                        </div>
                    <div>
                        <p className="font-semibold my-3">Company</p>
                        <ul className="text-[#535353] flex flex-col gap-2">
                            <li><Link href="/about">About Deepsea</Link></li>
                            <li><Link href="/sustainability">Sustainability</Link></li>
                            <li><Link href="/product">Product</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold">Contact</p>
                        <p className="text-[#535353] my-3">Call Me</p>
                        <p className="font-semibold">Pruduct</p>
                        <p className="text-[#535353] my-3">Pruduct Deepsea</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-around items-center">
                    <div className="w-full md:w-1/3">
                        <MapFooter/>
                    </div>
                    <p className="text-center text-[#535353]">This website was created independently and directly by students of <br/>
                        the Faculty of Engineering at the State <br/>
                        University of Malang.</p>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Find Us at</p>
                        <div className="flex gap-5 text-xl text-[#535353]">
                            <FiInstagram/>
                            <FaLinkedin/>
                            <RiTwitterXLine/>
                            <FaSpotify/>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;