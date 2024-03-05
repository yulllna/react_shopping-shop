import React from 'react';
import { FaStarOfLife } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { FaTshirt } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

function Header(props) {
    return (
        <div className='flex flex-row justify-between items-center'>
            <div className='flex'>
                <FaStarOfLife />
                <span>Calm</span>
            </div>
            <ul className='flex flex-row'>
                <li>
                    <IoSearchSharp />
                    <input type="text" />
                </li>
                <li>
                    <FaTshirt />
                    <span>products</span>
                </li>
                <li>
                    <IoCartSharp />
                    <span>cart</span>
                </li>
                <li>
                    <RiLoginBoxLine />
                    <span>login</span>
                </li>
            </ul>
        </div>
    );
}

export default Header;