import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { faBell, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfileLayout = ({ children }) => {
    
    
    return (
        <div>
            <Header />
            <div className="bg-slate-100 pt-[10px] pb-[40px]">
                <div className="container mx-auto flex py-5 gap-x-3 text-footer">
                    <div className="min-w-[250px] bg-white p-5 rounded-[5px]">
                        <a className='font-bold text-[20px] pb-3 border-b-2 w-full block' href="">Hồ sơ của tôi</a>
                        <div className="mt-[20px]">
                            <a className='flex items-center my-3 text-main' href="/profile">
                                <div className="w-[25px]">
                                    <FontAwesomeIcon className="" icon={faUser} />
                                </div>
                                <span className='font-medium'>Tài khoản</span>
                            </a>
                            <a className='flex items-center my-3' href="/profile/order">
                                <div className="w-[25px]">
                                    <FontAwesomeIcon className="" icon={faClipboardList} />
                                </div>
                                <span className='font-medium'>Đơn hàng</span>
                            </a>
                            <a className='flex items-center my-3' href="/profile/notify">
                                <div className="w-[25px]">
                                    <FontAwesomeIcon className="" icon={faBell} />
                                </div>
                                <span className='font-medium'>Thông báo</span>
                            </a>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProfileLayout
