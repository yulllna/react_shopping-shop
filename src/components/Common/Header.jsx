import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStarOfLife } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
// import { login, onUserStateChange, logout } from '../../firebase';
import Button from '../ui/Button'; // 버튼 컴포넌트 import
import User from 'components/User';
import { useAuthContext } from '../../context/AuthContext'
import CartStatus from './CartStatus';

function Header(props) {
  const navigate = useNavigate();
  const { user, login, logout } = useAuthContext();
  // const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const data = await login();
    console.log(data); // 로그인 정보
  };

  const handleLogout = () => {
    logout()
  };

  // useEffect(() => {
  //   onUserStateChange(user => {
  //     setUser(user)
  //   })
  // }, []);

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
          <Button
            icon={<FaTshirt className='w-6 h-6' />}
            text="products"
            onClick={() => navigate('/products')}
          />
        {
          user && user.isAdmin &&
          <Button
            icon={<MdManageAccounts className='w-6 h-6' />}
            text="admin"
            onClick={() => navigate('/admin')}
          />
        }
        {
          user &&
          <Button
            icon={<CartStatus/>}
            text="cart"
            onClick={() => navigate('/cart')}
          />
        }
        {
          user && <User user={user} />
        }
        {
          !user ? (
            <Button
              icon={<RiLoginBoxLine className='w-6 h-6' />}
              text="login"
              onClick={handleLogin}
            />
          ) : (
            <Button
              icon={<RiLogoutBoxLine className='w-6 h-6' />}
              text="logout"
              onClick={handleLogout}
            />
          )
        }

      </ul>
    </div>
  );
}

export default Header;
