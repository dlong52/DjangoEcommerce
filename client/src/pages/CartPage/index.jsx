import React from 'react'
import { banner } from '../../assets'
import {
  Breadcrumb,
  CartItem,
  EmptyCart,
  ProductItem
} from '../../components'

const CartPage = () => {
  const carts =[null]
  const arr = [null, null, null, null]
  return (
    <div className='bg-slate-50'>
      <div className="bg-white">
        <div className="container h-[150px] mx-auto flex justify-between items-center">
          <div className="">
            <h1 className='text-[30px] font-semibold text-footer'>Giỏ hàng của bạn</h1>
            <Breadcrumb />
          </div>
          <img className='h-full' src={banner} alt="" />
        </div>
      </div>
      <div className="container mx-auto mt-[20px]">
        {
          carts.length>0 ?
            <div className="grid grid-cols-12 gap-x-3">
              <div className="col-span-9 overflow-hidden rounded-[5px] shadow-md bg-white">
                <table className="w-full">
                  <thead>
                    <tr className='text-start border-b-[1px] border-[#051c42]'>
                      <th className='text-start px-5 h-[50px] text-footer bg-white'>Sản phẩm</th>
                      <th className='text-start px-5 h-[50px] text-footer bg-white'>Giá</th>
                      <th className='text-start px-5 h-[50px] text-footer bg-white'>Số lượng</th>
                      <th className='text-start px-5 h-[50px] text-footer bg-white'>Tổng</th>
                      <th className='text-start px-5 h-[50px] text-footer bg-white'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts?.map((cartItem, index) => {
                      return (
                        <CartItem key={index} />
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-span-3 text-footer bg-white rounded-[5px] h-fit shadow-md">
                <div className="h-[50px] flex items-center border-b-[1px] border-[#051c42]">
                  <h1 className='font-bold text-[20px] px-3'>Tạm tính</h1>
                </div>
                <div className="flex justify-between p-3">
                  <span className="font-semibold text-[18px]">Tổng</span>
                  <span className="font-bold text-[20px]">124.000₫</span>
                </div>
                <div className="flex flex-col p-3">
                  <a href='' className="flex justify-center items-center w-full h-[45px] bg-main my-1 rounded-[5px] font-semibold text-white">Thanh toán</a>
                  <a href='' className="flex justify-center items-center w-full h-[45px]  my-1 border-[2px] border-[#234bbb] rounded-[5px] font-semibold text-main">Tiếp tục mua sắm</a>
                </div>
              </div>
            </div>
            :
            <EmptyCart />
        }
        <div className="mt-[40px] py-5 border-t-2">
          <h1 className='font-bold text-[20px] text-footer my-1'>Best Sellers</h1>
          <div className="grid grid-cols-12 gap-3">
            {arr.map((product, index) => {
              return (
                <ProductItem key={index} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
