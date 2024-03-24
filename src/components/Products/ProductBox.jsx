import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductBox({product, product: {id, image, category, price, title}}) {
    const Navigate = useNavigate();
    return (
        <li className='w-full overflow-hidden shadow-md rounded-2xl h-96 hover:scale-105' onClick={() => {Navigate(`/product/${id}`, {state: {product}})}}>
            <img src={image} alt={title} className='object-cover w-full h-5/6' />
            <div className='p-2'>
                <div className='flex items-center justify-between px-2 text-slate-700'>
                    <p className='truncate'>{title}</p>
                    <p>{`₩${price.toLocaleString('ko-KR', { maximumFractionDigits: 4 })}`}</p>
                </div>
                <p className='px-2 text-slate-500'>{category}</p>
            </div>
        </li>
    );
}

export default ProductBox;