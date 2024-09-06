import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderPage = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const orderNav = [
    {
      name: 'Tất cả',
      path: '/profile/order'
    },
    {
      name: 'Chờ giao hàng',
      path: '/profile/order?type=1'
    },
    {
      name: 'Đang vận chuyển',
      path: '/profile/order?type=2'
    },
    {
      name: 'Hoàn thành',
      path: '/profile/order?type=3'
    },
    {
      name: 'Đã hủy',
      path: '/profile/order?type=0'
    }
  ];

  return (
    <div className='bg-white rounded-[5px] flex-1 p-3'>
      <div className="flex">
        {orderNav.map((item, index) => (
          <a
            href={item.path}
            key={index}
            className={`py-3 px-5 font-medium ${item.path === currentPath ? "border-b-[2px] border-main" : ""}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
