import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../../services/ProductServices';
import { getAllCategories } from '../../services/CategoryServices';
import { getAllCollections } from '../../services/CollectionServices';
import { ProductItem } from '../../components';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation ,useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // sử dụng useNavigate thay vì useHistory

  const searchParams = new URLSearchParams(location.hash.slice(1));
  const categoryQuery = searchParams?.get("category");
  const sizeQuery = searchParams?.get("size");
  const collectionQuery = searchParams?.get("collection");

  const sizes = ["XS", "SM", "M", "L", "XL", "2XL", "3XL", "4XL"];

  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const page_size = 8;

  const queryProducts = useQuery({
    queryKey: ['products', { name: searchName, category: selectedCategory, collection: selectedCollection, size: selectedSize, min_price: minPrice, max_price: maxPrice, order_by: orderBy, page: selectedPage, page_size: page_size, status: true }],
    queryFn: getAllProducts,
    staleTime: 1000 * 60,
    onError: (error) => console.error('Error fetching products:', error),
  });

  const queryCategories = useQuery({ queryKey: ['categories'], queryFn: getAllCategories, onError: (error) => console.error('Error fetching categories:', error) });
  const queryCollections = useQuery({ queryKey: ['collections'], queryFn: getAllCollections, onError: (error) => console.error('Error fetching collections:', error) });

  const products = queryProducts?.data;
  const categories = queryCategories?.data;
  const collections = queryCollections?.data;

  const handleCategoryChange = (category) => {
    const newSearchParams = new URLSearchParams(location.hash.slice(1));
    newSearchParams.set("category", category);
    if (selectedCollection) newSearchParams.set("collection", selectedCollection);
    if (selectedSize) newSearchParams.set("size", selectedSize);
    navigate(`#${newSearchParams.toString()}`);
    setSelectedCategory(category);
    setSelectedPage(1);
  };

  const handleCollectionChange = (collection) => {
    const newSearchParams = new URLSearchParams(location.hash.slice(1));
    newSearchParams.set("collection", collection);
    if (selectedCategory) newSearchParams.set("category", selectedCategory);
    if (selectedSize) newSearchParams.set("size", selectedSize);
    navigate(`#${newSearchParams.toString()}`);
    setSelectedCollection(collection);
    setSelectedPage(1);
  };

  const handleSizeChange = (size) => {
    const newSearchParams = new URLSearchParams(location.hash.slice(1));
    newSearchParams.set("size", size);
    if (selectedCategory) newSearchParams.set("category", selectedCategory);
    if (selectedCollection) newSearchParams.set("collection", selectedCollection);
    navigate(`#${newSearchParams.toString()}`);
    setSelectedSize(size);
    setSelectedPage(1);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
    setSelectedPage(1);
  };

  const handlePrevPage = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const handleNextPage = () => {
    if (selectedPage < Math.ceil(products?.count / page_size)) {
      setSelectedPage(selectedPage + 1);
    }
  };

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else if (sizeQuery) {
      setSelectedSize(sizeQuery);
    } else if (collectionQuery) {
      setSelectedCollection(collectionQuery);
    } else {
      setSelectedCategory(null)
    }
  }, [categoryQuery, sizeQuery, collectionQuery])

  return (
    <div className='py-6'>
      <div className="container mx-auto">
        <div className="grid grid-cols-10 gap-x-6">
          {/* Filter container */}
          <div className="col-span-2 scroll-m-10 flex flex-col gap-y-6">
            {/* Category filter */}
            <div className="flex flex-col gap-y-5">
              <span className='font-bold text-gray-400 text-[14px]'>Phù hợp với</span>
              <div className="text-[14px] text-gray-700 font-medium flex flex-col gap-y-4">
                {categories?.results.map((category, index) => (
                  <a
                    href={`#category=${category?.category_id}&collection=${selectedCollection || ''}&size=${selectedSize || ''}`}
                    key={index}
                    className={`flex items-center gap-x-2 cursor-pointer ${Number(categoryQuery) === category?.category_id ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleCategoryChange(category?.category_id)}
                  >
                    <div className={`size-[18px] rounded-full border-2 ${Number(categoryQuery) === category?.category_id ? 'border-blue-500' : 'border-gray-400'}`}></div>
                    <span>{category?.name}</span>
                  </a>
                ))}
              </div>

            </div>
            {/* Collection filter */}
            {/* Collection filter */}
            <div className="flex flex-col gap-y-5">
              <span className='font-bold text-gray-400 text-[14px]'>Nhóm sản phẩm</span>
              <div className="text-[14px] text-gray-700 font-medium flex flex-col gap-y-4">
                {collections?.results.map((collection, index) => (
                  <a 
                  href={`#collection=${collection?.collection_id}&category=${selectedCategory || ''}&size=${selectedSize || ''}`} 
                  key={index} 
                  className={`flex items-center gap-x-2 cursor-pointer ${Number(collectionQuery) === collection?.collection_id ? 'text-blue-500 font-bold' : ''}`}
                  onClick={() => handleCollectionChange(collection?.collection_id)}
                >
                  <div className={`size-[18px] rounded-full border-2 ${Number(collectionQuery) === collection?.collection_id ? 'border-blue-500' : 'border-gray-400'}`}></div>
                  <span>{collection?.name}</span>
                </a>
                
                ))}
              </div>
            </div>
            {/* Size filter */}
            <div className="flex flex-col gap-y-5">
              <span className='font-bold text-gray-400 text-[14px]'>Kích thước</span>
              <div className="text-[14px] text-gray-700 font-medium flex flex-wrap gap-3">
                {sizes.map((size, index) => (
                  <a href={`#size=${size}&category=${selectedCategory || ''}&collection=${selectedCollection || ''}`} key={index} onClick={() => handleSizeChange(size)} className={`py-1 px-5 rounded-[10px] border w-fit cursor-pointer col-span-4 ${selectedSize === size ? 'bg-blue-500 text-white' : 'border-gray-500'}`}>
                    {size}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Product container */}
          <div className="col-span-8">
            <div className="flex justify-between pb-5 font-medium text-[14px]">
              <span>{products?.results?.length || 0} kết quả</span>
              <div className="flex gap-x-4 items-center">
                <label htmlFor="" className='text-gray-600 font-semibold uppercase'>Phân loại</label>
                <select className='p-2 border rounded-full bg-gray-200 outline-none' onChange={handleOrderByChange}>
                  <option value="">Tất cả</option>
                  <option value="created_at">Mới nhất</option>
                  <option value="sales_count">Bán chạy</option>
                  <option value="-price">Giá từ cao đến thấp</option>
                  <option value="price">Giá từ thấp đến cao</option>
                </select>
              </div>
            </div>
            {products?.results?.length > 0 ? (
              <>
                <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                  {products?.results?.map((product, index) => (
                    <div key={index} className="col-span-3">
                      <ProductItem data={product} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-x-4 mt-[40px] justify-center">
                  <button onClick={handlePrevPage} disabled={selectedPage === 1}>
                    <FontAwesomeIcon icon={faAnglesLeft} size='lg' />
                  </button>
                  <span>{selectedPage}/{Math.ceil(products?.count / page_size)}</span>
                  <button onClick={handleNextPage} disabled={selectedPage === Math.ceil(products?.count / page_size)}>
                    <FontAwesomeIcon icon={faAnglesRight} size='lg' />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[300px]">
                <span>Không có sản phẩm nào phù hợp</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
