import React, { useState } from 'react';
import { RiImageAddFill } from "react-icons/ri";

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

function EditProducts(props) {
    const [formData, setFormData] = useState(editList);

    // input 값이 변경될 때 호출되는 핸들러 함수
    const handleChange = (code, value) => {
        setFormData((prevData) => {
          // Ensure that prevData is an array
          if (!Array.isArray(prevData)) {
            console.error("prevData is not an array");
            return prevData;
          }
      
          // code 값을 가진 항목을 찾아서 data 항목의 value를 변경
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
        // 폼 데이터를 활용하여 원하는 작업 수행
        console.log('Form data submitted:', formData);
        // 파이어 베이스 추가 + value삭제
        // writeData()
    };

    const [imageSrc, setImageSrc] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            // 이미지가 로드되면 상태를 업데이트하여 이미지를 표시
            setImageSrc(reader.result);
        };

        reader.readAsDataURL(file); // 파일을 base64로 변환하여 읽음
        }
    };

    return (
        <div className='p-4'>
            <p className='pb-2 text-xl font-bold text-center'>새로운 제품 등록</p>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                <div className='relative mb-4 overflow-hidden h-52 w-44'>
                    <input id='file' type="file" className='absolute w-full h-full' onChange={handleFileChange} />
                    <label htmlFor="file" className='absolute z-10 w-full h-full bg-gray-200'>
                        <div className='absolute z-10 left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%]'>
                            <RiImageAddFill className='w-8 h-8 mx-auto my-0 text-gray-400' />
                            <span className='text-gray-400'>이미지 추가</span>
                        </div>
                    </label>
                    
                    {/* 이미지가 있을 경우 */}
                    {
                        (imageSrc && imageSrc.trim() !== '') && <img src={imageSrc} alt="" className='absolute z-10 object-cover' />
                    }
                </div>
                {
                    editList.map((item) => {
                        return <input placeholder={item.title} type="text" id={item.code}
                        name={item.code}
                        value={formData[item.code]} onChange={(e) => handleChange(item.code, e.target.value)}
                        className="w-1/2 p-2 mt-1 mb-4 border rounded-md focus:outline-0" />
                    })
                }
                <button type="submit" className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded-md">저장</button>
            </form>
            
        </div>
    );
}

// function writeData() {
//     set(ref(db, 'users/' + userId), {
//         username: name,
//         email: email,
//         profile_picture : imageUrl
//     }).then(() => {
//         setTodo("");
//         alert('등록 완료')
//     }).catch((error) => {
//         return console.log(error)
//     });
// }

export default EditProducts;