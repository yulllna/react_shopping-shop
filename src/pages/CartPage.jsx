import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../firebase';
import { useAuthContext } from 'context/AuthContext';
import CartItem from 'components/Cart/CartItem';
import PriceCard from 'components/Cart/PriceCard';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;

function CartPage(props) {
    const { uid } = useAuthContext();
    const {isLoading, data: products} = useQuery({queryKey: ['products'], queryFn: () => getCart(uid) });
    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0)

    if(isLoading) return <p>loading...</p>
    return (
        <section className='flex flex-col p-8'>
            <p className='pb-4 text-2xl text-center border-b border-gray-300 text-bold'>내 장바구니</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
            {hasProducts && <>
                <ul className='p-4 px-8 mb-8 border-b border-gray-300'>
                    {products && products.map((product) => <CartItem key={product.id} product={product} uid={uid} />)}
                </ul>
                <div className='flex items-center justify-between px-2 md:px-8 lg:px-16'>
                    <PriceCard text="상품 총액" price={totalPrice} />
                    <BsFillPlusCircleFill className='shrink-0' />
                    <PriceCard text='배송액' price={SHIPPING} />
                    <FaEquals className='shrink-0' />
                    <PriceCard text='총 가격' price={totalPrice + SHIPPING} />
                </div>
                <button type="submit" className="w-full px-4 py-2 mt-6 text-white rounded-md bg-brand">주문하기</button>
            </>}
        </section>
    );
}

export default CartPage;