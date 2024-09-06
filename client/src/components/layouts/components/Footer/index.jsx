import React from 'react'
import { email, facebook, instagram, logo, phone, tiktok } from '../../../../assets'

const Footer = () => {
    return (
        <div className='bg-slate-100 min-h-[300px] border-t-[3px] border-[#234bbb]'>
            <div className="container mx-auto relative">
                <div className="flex flex-col items-center py-[40px] gap-y-3">
                    <h1 className="text-[25px] font-[700]">Thành viên Paddiers</h1>
                    <p>Đăng ký thành viên ngay hôm nay để nhận email về sản phẩm mới và chương trình khuyến mãi của Paddy</p>
                    <form className="flex gap-x-3">
                        <input className='border h-[45px] rounded-[5px] min-w-[350px] pl-5' placeholder='Email của bạn...' type="text" />
                        <button className='text-white bg-main h-[45px] rounded-[5px] px-5'>Đăng ký</button>
                    </form>
                </div>
                <div className="grid grid-cols-12 text-footer pb-[40px]">
                    <div className="col-span-3">
                        <span className='font-[700] text-[18px]'>Shop</span>
                        <div className="flex flex-col gap-y-2 mt-3 text-[16px] font-[400]">
                            <a href="">Dành cho chó</a>
                            <a href="">Dành cho mèo</a>
                            <a href="">Thương hiệu</a>
                            <a href="">Blogs</a>
                            <a href="">Bộ sưu tập</a>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <span className='font-[700] text-[18px]'>Paddy Pet Shop</span>
                        <div className="flex flex-col gap-y-2 mt-3 text-[16px] font-[400]">
                            <a href="">Giới thiệu</a>
                            <a href="">Thành viên Paddier</a>
                            <a href="">Điều khoản sử dụng tuyển dụng</a>
                            <a href="">Tuyển dụng</a>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <span className='font-[700] text-[18px]'>Hỗ trợ khách hàng</span>
                        <div className="flex flex-col gap-y-2 mt-3 text-[16px] font-[400]">
                            <a href="">Chính sách đổi trả</a>
                            <a href="">Phương thức vận chuyển</a>
                            <a href="">Chính sách bảo mật</a>
                            <a href="">Phương thức thanh toán</a>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <span className='font-[700] text-[18px]'>Liên hệ</span>
                        <div className="flex flex-col gap-y-2 mt-3 text-[16px] font-[400]">
                            <p>CÔNG TY CỔ PHẦN THUƠNG MẠI & DỊCH VỤ PADDY</p>
                            <p>MST: 0316459054</p>
                            <p>116 Nguyễn Văn Thủ, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
                            <p>Hotline: 0867677891 </p>
                            <p className='flex gap-1 items-center'>Email: marketing@paddy.vn</p>
                            <div className="flex gap-2">
                                <a className='w-[40px] aspect-square rounded-full bg-footer flex items-center justify-center' href="">
                                    <img className='w-[18px] aspect-square fill-white' src={facebook} alt="" />
                                </a>
                                <a className='w-[40px] aspect-square rounded-full bg-footer flex items-center justify-center' href="">
                                    <img className='w-[18px] aspect-square fill-white' src={instagram} alt="" />
                                </a>
                                <a className='w-[40px] aspect-square rounded-full bg-footer flex items-center justify-center' href="">
                                    <img className='w-[18px] aspect-square fill-white' src={tiktok} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
