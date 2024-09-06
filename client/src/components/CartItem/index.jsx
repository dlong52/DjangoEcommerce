import { faDeleteLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CartItem = () => {
    return (
        <tr className='h-[100px] w-fit bg-white text-footer'>
            <td className='flex w-[400px] p-5'>
                <img className='h-[100px]' src="https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1718875299" alt="" />
                <div className="flex flex-col gap-y-1 ml-3">
                    <h1 className='font-semibold text-[16px]'>Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27</h1>
                    <span>400g</span>
                    <span>Royal Canin</span>
                </div>
            </td>
            <td className='p-5 text-[18px] font-semibold'>124.000₫</td>
            <td className='p-5'>
                <div className="flex justify-between items-center p-2">
                    <FontAwesomeIcon icon={faMinus} />
                    <span className='font-semibold'>1</span>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </td>
            <td className='p-5 text-[18px] font-semibold'>124.000₫</td>
            <td className='p-5'>
                <FontAwesomeIcon icon={faDeleteLeft} size='lg' />
            </td>
        </tr>
    )
}

export default CartItem
