import React from 'react';
import mainImage from '../assets/image/main_background.jpg';
import Products from 'components/Products/Products';

function mainPage(props) {
    return (
        <div>
            <div className='w-full h-[300px] relative'>
                <img src={mainImage} alt="메인이미지" className='object-cover w-full h-full' />
                <div className='absolute origin-center top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'>
                    <span className='text-2xl font-bold text-slate-600'>calm shop</span>
                    <p className='text-lg text-slate-500'>discover your own sanctuary of relaxation.</p>
                </div>
                <div className='p-4'>
                    <Products />
                </div>
            </div>
        </div>
    );
}

export default mainPage;