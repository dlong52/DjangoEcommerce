import React, { Fragment, memo, useState } from 'react'
import { headerRoutes } from '../../../../routes'
import { cart, heart, logo, search } from '../../../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../../services/UserService'
import { resetUser} from '../../../../redux/userSlice'
const Header = () => {
  const [isShow, setIsShow] = useState(false)
  const user = useSelector((state) => state?.user)
  console.log("user: ", user);
  
  const dispatch = useDispatch()
  const handleLogout = async () => {
    // document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure=true; samesite=none;";
    localStorage.removeItem('accessToken');
    await logoutUser()
    dispatch(resetUser())
  }
  const handleMouseEnter = () => {
    setIsShow(true)
  }

  const handleMouseLeave = () => {
    setIsShow(false)
  }
  const arr = [null, null, null, null]
  return (
    <Fragment>
      <div className='relative'>
        <div className="py-[20px] bg-main">
          <div className="container mx-auto ">
            <div className="flex justify-between items-center">
              <a href="/"><img className='h-[60px]' src={logo} alt="" /></a>
              <form className="flex flex-1 mx-[30px] bg-white h-[40px] rounded-[5px] overflow-hidden">
                <input className='h-full flex-1 pl-[20px] outline-none' placeholder='Tìm kiếm...' type="text" />
                {/* <button className='text-gray-700 h-full aspect-square flex items-center justify-center'>
                  <img className='w-[30px]' src={search} alt="" />
                </button> */}
              </form>
              <div className="flex gap-6">
                <a className='relative h-[40px]' href="">
                  <img className='h-full' src={heart} alt="" />
                </a>
                <a className='relative h-[40px]' href="/cart">
                  <img className='h-full' src={cart} alt="" />
                  <span className='bg-main-yellow absolute -top-[5px] -right-[5px] text-white px-[5px] font-medium rounded-full'>0</span>
                </a>
                {!(user?.username) ?
                  <a className='h-[40px] text-[14px] p-2 font-[600] bg-white text-main rounded-[5px]' href="/signin">Đăng nhập</a> :
                  <div className="relative">
                    <a href="/profile" className="size-[40px] flex items-center justify-center text-[20px] p-2 font-[700] bg-gray-300 text-white rounded-full ">
                      {user?.username.charAt(0)}
                    </a>
                    <div className=" cursor-pointer absolute bg-white flex flex-col z-50 shadow-lg rounded-[10px] right-0 mt-[5px] before:content-[''] before:absolute before:bottom-[100%] before:right-[14px] before:border-[6px] before:border-transparent before:border-b-white font-medium">
                      <a className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700 rounded-t-[10px]' href="/profile">Thông tin người dùng</a>
                      <a onClick={handleLogout} className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700 rounded-b-[10px]' >Đăng xuất</a>
                    </div>
                  </div>

                }
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-md">
          <div className="container mx-auto flex justify-center">
            <div className="flex font-medium text-gray-800 text-[17px]">
              {headerRoutes.map((headerRoute, index) => {
                return (
                  <a
                    key={index}
                    className='mx-[20px] py-[10px] hover:text-[#234bbb]'
                    href=""
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {headerRoute.name}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-5 bg-white shadow-lg border-t-2 absolute w-full z-50 transition-all duration-300"
        style={{
          visibility: isShow ? "visible" : "hidden",
          opacity: isShow ? 1 : 0,
          transform: !isShow ? "translateY(-20px)" : "translateY(0)"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto grid grid-cols-12">
          {arr.map((category, index) => {
            return (
              <div key={index} className="col-span-3">
                <a href='' className='font-semibold uppercase'>Category</a>
                <ul className="mt-1 flex flex-col gap-y-1">
                  <li><a href="">Category Item</a></li>
                  <li><a href="">Category Item</a></li>
                  <li><a href="">Category Item</a></li>
                  <li><a href="">Category Item</a></li>
                </ul>
              </div>
            )
          })}

        </div>
      </div>
    </Fragment>
  )
}

export default memo(Header)
