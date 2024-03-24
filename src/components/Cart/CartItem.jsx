import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai';
import { addOrUpdateToCart, removeFromCart } from '../../firebase';

const ICON_CLASS = 'mx-1 transition-all cursor-pointer hover:text-brand hover:scale-105';

function CartItem({text, product, product: {id, price, image, title, option, quantity}, uid}) {
    const handleMinus = () => {
        if(quantity < 2) return;
        addOrUpdateToCart(uid, {...product, quantity: quantity - 1});
    }
    const handlePlus = () => addOrUpdateToCart(uid, {...product, quantity: quantity + 1});
    
    const handleDelete = () => removeFromCart(uid, id)

    return (
        <li className='flex items-center justify-between my-2'>
            <img className='w-24 mr-4 rounded-lg md:w-48' src={image} alt={title} />
            <div className='flex justify-between flex-1'>
                <div className='basis-3/5'>
                    <p className='text-lg'>{title}</p>
                    <p className='text-xl font-bold text-brand'>{option}</p>
                    <p>₩{price}</p>
                </div>
            </div>
            <div className='flex items-center text-2xl'>
                <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
                <span>{quantity}</span>
                <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
                <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
            </div>
        </li>
    );
}

export default CartItem;