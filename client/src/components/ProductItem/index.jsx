import React from 'react'

const ProductItem = () => {
    return (
        <div className="col-span-2 overflow-hidden">
            <div className="">
                <a href="/shop/Áo Polo Nam Pique Cotton">
                    <img className='rounded-[7px]' src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png" alt="" />
                </a>
                <div className="flex flex-col gap-y-1">
                    <h1 className='font-semibold text-[17px] text-footer'>Áo Polo Nam Pique Cotton</h1>
                    <div className="flex gap-x-2">
                        <h2 className='text-[16px] font-bold'>249.000₫</h2>
                        <div className="text-white bg-blue-700 rounded-sm px-1 text-[12px] flex items-center justify-center">-15%</div>
                        <h2 className='text-[16px] h-fit relative text-gray-400 font-semibold before:w-full  before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:-translate-y-1/2'>299.000₫</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
