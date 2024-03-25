import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCart from '../../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='absolute w-6 h-6 font-bold text-center text-white rounded-full bg-brand -top-1 -right-2'>
          {products.reduce((prev, current) => prev + current.quantity, 0)}
        </p>
      )}
    </div>
  );
}
