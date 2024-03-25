import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';

function ProductDetail(props) {
    const { addOrUpdateItem } = useCart();
    const {
        state: {
            product: {
                id, image, title, description, category, options, price
            }
        },
    } = useLocation();
    const [success, setSuccess] = useState();
    const [selected, setSelected] = useState(options && options[0]);

    const handleSelect = (e) => setSelected(e.target.value);

    const handleClick = () => {
        const product = {
            id, image, title, price, option: selected, quantity: 1
        };
        addOrUpdateItem.mutate(product, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.')
                setTimeout(() => {
                    setSuccess(null)
                }, 3000)
            }
        });
    }

    return (
        <section>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col p-4 md:flex-row'>
                <img src={image} alt={title} className="w-[300px] px-4 basis-7/12" />
                <div className='flex flex-col p-4 w-fulll basis-5/12'>
                    <h2 className='py-2 text-3xl font-bold'>{title}</h2>
                    <p className='py-2 text-2xl font-bold border-b border-gray-400'>₩{price}</p>
                    <p className='py-4 text-lg'>{description}</p>
                    <div className='flex items-center'>
                        <label className='font-bold text-brand' htmlFor='select'>옵션: </label>
                        {/* key값을 지정해야 리액트에서 성능 최적화를 해줌. 리스트 아이템이 자주 변경, 추가, 삭제 되는 경우에는 index로 key값을 설정하면 안 됨. */}
                        <select onChange={handleSelect} id='select' value={selected} className='p-2 m-4 border-2 border-dashed outline-none border-brand'>{options && options.map((option, index) => {
                            return <option key={index}>{option}</option>
                        })}</select>
                    </div>
                    {success && <p className='my-2'>✅{success}</p>}
                    <button className='bg-[#5c4801] p-2 rounded-lg text-white' onClick={handleClick}>장바구니에 추가</button>
                </div>
            </section>
        </section>
    );
}

export default ProductDetail;