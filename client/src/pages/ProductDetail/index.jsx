import React from 'react'
import { Breadcrumb, FeedbackStar } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { contact, location, return_0, return_60 } from '../../assets'

const ProductDetail = () => {
    return (
        <div className=''>
            <div className="container mx-auto">
                <Breadcrumb />
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-6 grid grid-cols-12">
                        <div className="flex flex-col gap-y-2 col-span-2">
                            <img className={`w-2/3 rounded-[6px]`} src="https://media3.coolmate.me/cdn-cgi/image/width=80,height=80,quality=80,format=auto/uploads/January2024/poloapl220.11.png" alt="" />
                            <img className={`w-2/3 rounded-[6px]`} src="https://media3.coolmate.me/cdn-cgi/image/width=80,height=80,quality=80,format=auto/uploads/August2023/APL100-thumb-6.jpg" alt="" />
                            <img className={`w-2/3 rounded-[6px]`} src="https://media3.coolmate.me/cdn-cgi/image/width=80,height=80,quality=80,format=auto/uploads/January2024/poloapl220.12.jpg" alt="" />
                            <img className={`w-2/3 rounded-[6px]`} src="https://media3.coolmate.me/cdn-cgi/image/width=80,height=80,quality=80,format=auto/uploads/January2024/poloapl220.9.jpg" alt="" />
                        </div>
                        <div className="col-span-10">
                            <img className='w-full rounded-[10px]' src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png" alt="" />
                        </div>
                    </div>
                    <div className="col-span-6 bg-white flex flex-col gap-y-5">
                        <div className="flex flex-col gap-y-3">
                            <h1 className='text-main font-semibold text-[30px]'>Áo Polo Nam Pique Cotton</h1>
                            <a className='-ml-[1px] flex gap-x-2 items-center text-gray-600 text-sm' href="#feedback">
                                <FeedbackStar />
                                <span>1 đánh giá</span>
                            </a>
                            <div className="flex gap-2 items-center text-gray-600 font-medium">
                                <span className='before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:-translate-y-1/2 text-[17px] text-gray-400 relative'>299.000₫</span>
                            </div>
                            <div className=" text-[25px] font-bold flex items-center gap-x-2 text-gray-600">
                                <span className='text-black'>249.000₫</span>
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-col text-gray-600 text-[17px] font-medium">
                                    <span>Kích thước:</span>
                                    <div className="flex gap-x-3">
                                        <div className="w-[79px] h-[40px] flex justify-center items-center bg-[#000] text-white rounded-[8px] cursor-pointer">S</div>
                                        <div className="w-[79px] h-[40px] flex justify-center items-center bg-[#d9d9d9] rounded-[8px] cursor-pointer">M</div>
                                        <div className="w-[79px] h-[40px] flex justify-center items-center bg-[#d9d9d9] rounded-[8px] cursor-pointer">L</div>
                                        <div className="w-[79px] h-[40px] flex justify-center items-center bg-[#d9d9d9] rounded-[8px] cursor-pointer">XL</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-x-2">
                                <span>Số lượng: </span>
                                <div className="flex gap-x-3 items-center px-2 py-1 border-main text-main rounded-full">
                                    <FontAwesomeIcon icon={faMinus} />
                                    <span className='font-semibold'>1</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            <div className=" flex items-center gap-x-3 text-[20px] font-bold">
                                <span>Tổng số tiền: </span>
                                <span>182.000₫</span>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <button className="bg-main text-white px-6 h-[45px] rounded-full flex-1">Thêm vào giỏ hàng</button>
                                <button className=" h-[45px] aspect-square rounded-full border border-gray-400 hover:bg-red-400 hover:text-red-600 hover:border-none transition-all duration-200">
                                    <FontAwesomeIcon className='' icon={faHeart} />
                                </button>
                                <button>
                                    <FontAwesomeIcon className='text-gray-600' icon={faShareNodes} size='2xl' />
                                </button>
                            </div>
                            <div className="grid grid-cols-12 gap-4 mt-[40px] text-[14px] font-medium">
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={return_0} alt="" />
                                    <span>Đổi trả cực dễ chỉ cần số
                                    điện thoại</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={return_60} alt="" />
                                    <span>60 ngày đổi trả vì bất kỳ lý do gì</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={contact} alt="" />
                                    <span>Hotline 1900.27.27.37 hỗ
                                    trợ từ 8h30 - 22h mỗi ngày</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={location} alt="" />
                                    <span>Đến tận nơi nhận hàng trả,
                                    hoàn tiền trong 24h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
    )
}

export default ProductDetail
