import React from 'react';
import ProductBox from './ProductBox';

function products(props) {
    return (
        <ul className='flex gap-4'>
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
        </ul>
    );
}

export default products;