import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStarOfLife } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { FaTshirt } from "react-icons/fa";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { handleSignInWithPopup, auth } from '../../firebase';
import {signOut} from 'firebase/auth'

function Header(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    console.log(user)

    const handleLogin = async () => {
        const data = await handleSignInWithPopup();
        console.log(data); // 로그인 정보
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/');
        }).catch((error) => {
            // An error happened.
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // 사용자가 로그인한 경우
            setUser(authUser);
          } else {
            // 사용자가 로그아웃한 경우
            setUser(null);
          }
        });
    
        // useEffect 클린업 함수에서 이벤트 리스너 등록 해제
        return () => unsubscribe();
      }, []);

    return (
        <div className='flex flex-row items-center justify-between h-12 px-4'>
            <Link to='/' className='flex items-center'>
                <FaStarOfLife />
                <span className='text-2xl font-bold'>Calm</span>
            </Link>
            <ul className='flex flex-row'>
                <li className='flex items-center mr-3'>
                    <IoSearchSharp className='w-6 h-6' />
                    <input type="text" className='ml-1 border-b-2 focus:outline-0' placeholder='search' />
                </li>
                <li>
                    <Link to='./products' className='flex items-center mr-3'>
                        <FaTshirt className='w-6 h-6' />
                        <span className='ml-1'>products</span>
                    </Link>
                </li>
                {
                    user?.displayName === 'yul' && 
                (<li>
                    <Link to='./admin' className='flex items-center mr-3'>
                        <MdManageAccounts className='w-6 h-6' />
                        <span className='ml-1'>admin</span>
                    </Link>
                </li>)
                }
                {
                    user && (<li>
                        <Link to='./cart' className='flex items-center mr-3'>
                            <IoCartSharp className='w-6 h-6' />
                            <span className='ml-1'>cart</span>
                        </Link>
                    </li>)
                }
                {
                    !user ? (
                    <li className='flex items-center mr-3' onClick={handleLogin}>
                        <RiLoginBoxLine className='w-6 h-6' />
                        <span className='ml-1'>login</span>
                    </li>
                    ) : (
                        <li className='flex items-center mr-3' onClick={handleLogout}>
                            <RiLogoutBoxLine className='w-6 h-6' />
                            <span className='ml-1'>logout</span>
                        </li>
                    )
                }
                
            </ul>
        </div>
    );
}

export default Header;