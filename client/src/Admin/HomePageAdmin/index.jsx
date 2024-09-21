import React, { useState } from 'react';
import WidgetItem from '../../components/WidgetItem';
import { useQuery } from '@tanstack/react-query';
import { getAllOrder } from '../../services/OrderServices';
import MonthlyRevenueChart from '../../components/MonthlyRevenueChart';
import { getAllProducts } from '../../services/ProductServices';
import { getAllUsers } from '../../services/UserService';

const HomePageAdmin = () => {
  const [filters, setFilters] = useState({
    payment_status: '',
    order_date_after: '',
    order_date_before: '',
    payment_method: '',
    username: '',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, refetch } = useQuery({
    queryKey: ['orders', filters, page],
    queryFn: () => getAllOrder(filters, page, pageSize),
    keepPreviousData: true,
  });

  const productsData = useQuery({
    queryKey: ['products', {page_size: 1000}],
    queryFn: getAllProducts
  })?.data?.results;

  const countProductInStock = productsData?.filter((product) => product?.stock_quantity > 0)?.length;
  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })?.data;
  
  const calculateDailyRevenue = (orders) => {
    const dailyRevenue = Array(31).fill(0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let totalRevenue = 0;

    orders.forEach(order => {
      const orderDate = new Date(order.order_date);
      if (orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth) {
        const day = orderDate.getDate();
        const amount = parseFloat(order.total_amount);
        dailyRevenue[day - 1] += amount;
        totalRevenue += amount; // Accumulate total revenue
      }
    });

    return { dailyRevenue, totalRevenue }; // Return both daily revenue and total revenue
  };

  const { dailyRevenue, totalRevenue } = data ? calculateDailyRevenue(data.results) : { dailyRevenue: Array(31).fill(0), totalRevenue: 0 };

  return (
    <div className='px-6 py-6'>
      <div className="grid grid-cols-12 gap-3">
        <WidgetItem content={`${countProductInStock}/${productsData?.length} Sản Phẩm`} title={"Số lượng sản phẩm còn hàng"} />
        <WidgetItem content={`${totalRevenue.toLocaleString()} VNĐ`} title={"Tổng doanh thu tháng hiện tại"} /> {/* Display total revenue */}
        <WidgetItem content={`${usersData?.length} Người dùng`} title={"Số lượng người dùng"} />
      </div>
      <div className="mt-6">
        <MonthlyRevenueChart dailyRevenue={dailyRevenue} /> {/* Pass the daily revenue data */}
      </div>
    </div>
  );
}

export default HomePageAdmin;
