import React from 'react'

const EmptyCart = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[300px]'>
            <h1 className='text-[25px] font-bold'>Giỏ hàng của bạn đang trống</h1>
            <a href="" className="mt-[20px] p-2 border-[2px] border-[#234bbb] rounded-[5px] text-white font-semibold bg-main">Tiếp tục mua sắm</a>
        </div>
    )
}

export default EmptyCart
