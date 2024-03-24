import React from 'react';
import { IoCartSharp } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../firebase';
import { useAuthContext } from 'context/AuthContext';

function CartStatus(props) {
    const { uid } = useAuthContext();
    const {data: products} = useQuery({queryKey: ['products'], queryFn: () => getCart(uid) });

    return (
        <div className='relative'>
            <IoCartSharp className='text-4xl' />
            {products && <p className='absolute w-5 h-5 font-bold text-center text-white border-white rounded-full outline bg-brand -top-1 -right-2'>{products.length}</p>}
        </div>
    );
}

export default CartStatus;