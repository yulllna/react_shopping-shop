import React from 'react';
import tempImg from '../../assets/image/example.jpg'

function ProductBox(props) {
    return (
        <div className='w-3/12 overflow-hidden shadow-md rounded-2xl h-96 hover:scale-105'>
            <img src={tempImg} alt="" className='object-cover h-5/6' />
            <div className='p-2'>
                <div className='flex items-center justify-between px-2 text-slate-700'>
                    <p>상품명</p>
                    <p>50000</p>
                </div>
                <p className='px-2 text-slate-500'>여성</p>
            </div>
        </div>
    );
}

export default ProductBox;