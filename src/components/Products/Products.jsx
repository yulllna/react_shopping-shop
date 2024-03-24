import React from 'react';
import ProductBox from './ProductBox';
import {getProducts} from '../../firebase'
import { useQuery } from '@tanstack/react-query';


function Products(props) {
    const {
        isLoading, 
        error, 
        data: products
    } = useQuery({ 
        queryKey: ['products'], 
        queryFn: getProducts 
    })
    
    // getProducts().then((res) => {
    //     console.log(res)
    // })
    return (
        <>
            {isLoading && <p>loading...</p>}
            {error && <p>{error}</p>}
            <ul className='grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4'>
                    {products && products.map(product => {
                        return <ProductBox key={product.id} product={product} />
                    })
                }
            </ul>
        </>
    );
}

export default Products;