import React, { useState } from 'react';
import { RiImageAddFill } from "react-icons/ri";
import { uploadImage } from 'api/uploader';
import { addNewProduct } from '../../firebase';

const editList = [
    {
        title: '제품명',
        code: 'NAME',
        data: ''
    },
    {
        title: '가격',
        code: 'PRICE',
        data: ''
    },
    {
        title: '카테고리',
        code: 'CATEGORY',
        data: ''
    },
    {
        title: '제품 설명',
        code: 'DESCRIPTION',
        data: ''
    },
    {
        title: '옵션들(콤마(,)로 구분)',
        code: 'OPTIONS',
        data: ''
    },
]

function EditProducts() {
    const [formData, setFormData] = useState(editList);
    const [imageSrc, setImageSrc] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const[success, setSuccess] = useState();

    // input 값이 변경될 때 호출되는 핸들러 함수
    const handleChange = (code, value) => {
        setFormData((prevData) => {
          // Ensure that prevData is an array
          if (!Array.isArray(prevData)) {
            console.error("prevData is not an array");
            return prevData;
          }
      
          const updatedData = prevData.map((item) => {
            if (item.code === code) {
              return {
                ...item,
                data: value,
              };
            }
            return item;
          });
      
          return updatedData;
        });
      };

    // 폼을 제출할 때 호출되는 핸들러 함수
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsUploading(true);
        uploadImage(imageSrc)
        .then(url => {
            console.log(url)
            addNewProduct(formData, url)
            .then(() => {
                setInitFormData()
                setSuccess('성공적으로 제품이 추가되었습니다.');
                setTimeout(() => {
                    setSuccess(null)
                }, 3000);
            })
        })
        .finally(() => {
            setIsUploading(false)
        })
    };

    const setInitFormData = () => {
        setFormData(editList);
        console.log(editList);
        
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
        input.value = '';
    });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
        setImageSrc(file);
        }
    };

    return (
        <div className='p-4'>
            <p className='pb-2 text-xl font-bold text-center'>새로운 제품 등록</p>
            {success && <p className='my-2 text-center'>✅ {success}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                <div className='relative mb-4 overflow-hidden h-52 w-44'>
                    <input id='file' accept='image/*' type="file" name='file' className='absolute w-full h-full' onChange={handleFileChange} required />
                    <label htmlFor="file" className='absolute z-10 w-full h-full bg-gray-200'>
                        <div className='absolute z-10 left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%]'>
                            <RiImageAddFill className='w-8 h-8 mx-auto my-0 text-gray-400' />
                            <span className='text-gray-400'>이미지 추가</span>
                        </div>
                    </label>
                    
                    {/* 이미지가 있을 경우 */}
                    {
                        imageSrc && <img src={URL.createObjectURL(imageSrc)} alt="" className='absolute z-10 object-cover w-full h-full' />
                    }
                </div>
                {
                    editList.map((item, index) => {
                        return <input placeholder={item.title} type="text" id={item.code}
                        name={item.code} key={index}
                        value={formData[item.code]} onChange={(e) => handleChange(item.code, e.target.value)}
                        className="w-1/2 p-2 mt-1 mb-4 border rounded-md focus:outline-0 form-input" />
                    })
                }
                <button type="submit" className="w-1/2 px-4 py-2 text-white rounded-md bg-brand" disabled={isUploading}>{isUploading ? '업로드 중...' : '제품 등록하기'}</button>
            </form>
        </div>
    );
}

export default EditProducts;