import React, { useState } from 'react'
import {
  CartItem,
  EmptyCart,
} from '../../components'
import { deleteCartItem, getAllCartItems, updateCartItem } from '../../services/CartServices';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import helpers from '../../utils/helper';
import { COD, paypal } from '../../assets';
import AddressForm from '../../components/AddressForm';
import { updateUser as updateUserUi } from '../../redux/userSlice';
import { createOrder } from '../../services/OrderServices';
import NotifyOrderSuccess from '../../components/NotifyOrderSuccess';

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: user?.username,
    phone_number: user?.phone_number,
    email: user?.email,
    address: user?.address,
  });
  // Function to update the address in local state
  const updateAddressInState = (newAddress) => {
    setData((prevData) => ({
      ...prevData,
      address: newAddress,
    }));
  };
  const [successOrder, setSuccessOrder] = useState(false)
  const [indexPaymentMethod, setIndexPaymentMethod] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderId, setOrderId] = useState(null)
  const paymentMethods = [
    {
      name: "COD",
      title: "Thanh toán khi nhận hàng",
      code: "cod",
      icon: COD,
    },
    {
      name: "Ví điện tử Paypal",
      code: "paypal",
      icon: paypal,
    },
  ];

  const queryCarts = useQuery({
    queryKey: ['cart_items', user?.user_id],
    queryFn: () => getAllCartItems(user?.user_id),
    enabled: !!user?.user_id,
  });

  const cartItems = queryCarts?.data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const totalPrice = helpers.roundNumber(cartItems?.reduce((accumulator, item) => {
    return accumulator + ((item?.product_price * (1 - item.product_discount / 100)) * item?.quantity);
  }, 0));

  const onIncrease = async (cartItem) => {
    await updateCartItem(cartItem?.id, cartItem?.quantity + 1, cartItem?.size);
    queryCarts.refetch();
  };

  const onDecrease = async (cartItem) => {
    if (cartItem?.quantity > 1) {
      await updateCartItem(cartItem?.id, cartItem?.quantity - 1, cartItem?.size);
      queryCarts.refetch();
    }
  };

  const onUpdateSize = async (cartItem, size) => {
    await updateCartItem(cartItem?.id, cartItem?.quantity, size);
    queryCarts.refetch();
  };

  const onDelete = async (cartItem) => {
    await deleteCartItem(cartItem?.id);
    queryCarts.refetch();
  };

  const handleShowAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleCreateOrder = async () => {
    try {
      // Validation checks
      if (!data.username || !data.phone_number || !data.address) {
        alert("Vui lòng điền đầy đủ thông tin (Họ tên, Số điện thoại, Địa chỉ).");
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        alert("Chưa có sản phẩm nào trong giỏ hàng.");
        return;
      }

      const res = await createOrder(user?.user_id, paymentMethod, data.username, data.phone_number, data.address);
      
      if (res?.status == 'success') {
        setOrderId(res?.data?.order_id)
        queryCarts.refetch();
        setSuccessOrder(true)
      }
      // Optionally, clear the cart or redirect the user
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };
  return (
    <div className='pb-[100px]'>
      {showAddressForm && <AddressForm
        user={user}
        showAddressForm={() => setShowAddressForm(!showAddressForm)}
        updateAddressInState={updateAddressInState} // Pass the function here
      />}
      {successOrder && <NotifyOrderSuccess orderId={orderId} close={()=>{setSuccessOrder(false)}} />}
      <div className="container m-auto py-6">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-6 flex flex-col gap-y-6">
            <span className="font-bold text-[25px]">Thông tin đặt hàng</span>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                <label htmlFor="username" className='font-medium'>Họ tên:</label>
                <input
                  id="username"
                  name="username"
                  className="w-full h-[45px] border rounded-[10px] px-6"
                  type="text"
                  value={data?.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-5">
                <label htmlFor="phone_number" className='font-medium'>Số điện thoại:</label>
                <input
                  id="phone_number"
                  name="phone_number"
                  className="w-full h-[45px] border rounded-[10px] px-6"
                  type="text"
                  value={data?.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-12">
                <span className='font-medium'>Email: </span>
                <span>{helpers.maskEmail(data?.email)}</span>
              </div>
              <div className="col-span-12 flex gap-x-2">
                <span className='font-medium'>Địa chỉ: </span>
                <span>{data?.address}</span>
                <button onClick={handleShowAddressForm} className='text-blue-700 underline'>Thay đổi</button>
              </div>
            </div>
            <span className="font-bold text-[25px]">Hình thức thanh toán</span>
            <div className="flex flex-col gap-y-6">
              {paymentMethods?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { setIndexPaymentMethod(index); setPaymentMethod(item.code) }}
                  className={`h-[67px] rounded-[15px] border flex items-center p-6 gap-6 cursor-pointer ${indexPaymentMethod === index ? 'border-blue-500' : 'border-gray-500 opacity-50'
                    }`}
                >
                  <div className={`size-[20px] rounded-full border ${indexPaymentMethod === index ? 'flex items-center justify-center border-blue-500' : ''
                    }`}>
                    {indexPaymentMethod === index && <div className="size-[10px] bg-blue-500 rounded-full"></div>}
                  </div>
                  <img
                    className="max-h-[30px] max-w-[60px]"
                    src={item.icon}
                    alt={item.name}
                  />
                  <div className="flex flex-col font-medium text-gray-600">
                    <span>{item.name}</span>
                    {item.title && <span>{item.title}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-y-6">
            <span className="font-bold text-[25px]">Giỏ hàng</span>
            <div>
              {!(cartItems?.length === 0) ?
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 text-nowrap">Sản phẩm</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 text-nowrap">Số lượng</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 text-nowrap">Tổng</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((cartItem, index) => (
                      <CartItem
                        key={index}
                        data={cartItem}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        onDelete={onDelete}
                        onUpdateSize={onUpdateSize}
                      />
                    ))}
                  </tbody>
                </table> :
                <EmptyCart />
              }
              <div>
                <div className="flex flex-col text-[15px] font-medium text-gray-700 gap-y-3 py-6 border-y my-6">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{helpers.numberFormat(totalPrice)}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>0đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span>Miễn phí</span>
                  </div>
                </div>
                <div className="flex justify-between text-[18px] font-medium text-gray-800">
                  <span>Tổng</span>
                  <span className='font-bold'>{helpers.numberFormat(totalPrice)}đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-white shadow-inner grid grid-cols-12">
        <div className="col-span-6 flex items-center bg-slate-100 px-6">
          {indexPaymentMethod !== null ? (
            <>
              <div className="font-semibold w-1/2 flex justify-center items-center p-6 gap-3 border-r-2">
                <img className='h-[40px] max-w-[100px]' src={paymentMethods[indexPaymentMethod]?.icon} alt="" />
                {paymentMethods[indexPaymentMethod]?.code === 'cod' &&
                  <span className="text-[16px] text-gray-700">
                    {paymentMethods[indexPaymentMethod]?.title}
                  </span>}
              </div>
              <span className="text-[14px] font-semibold text-blue-800 w-1/2 flex justify-center p-6 ">Chưa dùng voucher</span>
            </>
          ) : (
            <span>Vui lòng chọn phương thức thanh toán</span>
          )}
        </div>
        <div className="col-span-6 flex items-center justify-end gap-6 px-6">
          <div className="flex flex-col items-end">
            <span className="font-semibold">Thành tiền</span>
            <span className="font-bold text-blue-700 text-[25px]">{helpers.numberFormat(totalPrice)}đ</span>
          </div>
          <button onClick={handleCreateOrder} className="w-[200px] py-3 bg-black text-white rounded-full">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
