import React from 'react';
import { FaStarOfLife } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { FaTshirt } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

function Header(props) {
    return (
        <div className='flex flex-row items-center justify-between h-12 px-4'>
            <div className='flex items-center'>
                <FaStarOfLife />
                <span className='text-2xl font-bold'>Calm</span>
            </div>
            <ul className='flex flex-row'>
                <li className='flex items-center mr-3'>
                    <IoSearchSharp className='w-6 h-6' />
                    <input type="text" className='ml-1 border-b-2 focus:outline-0' placeholder='search' />
                </li>
                <li className='flex items-center mr-3'>
                    <FaTshirt className='w-6 h-6' />
                    <span className='ml-1'>products</span>
                </li>
                <li className='flex items-center mr-3'>
                    <IoCartSharp className='w-6 h-6' />
                    <span className='ml-1'>cart</span>
                </li>
                <li className='flex items-center mr-3'>
                    <RiLoginBoxLine className='w-6 h-6' />
                    <span className='ml-1'>login</span>
                </li>
            </ul>
        </div>
    );
}

export default Header;