import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getAllCategories } from '../../../services/CategoryServices';
import { getAllCollections } from '../../../services/CollectionServices';
import { updateProduct } from '../../../services/ProductServices';

const EditProductForm = ({ handleClose, data }) => {
  const query = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
  const query1 = useQuery({ queryKey: ['collection'], queryFn: getAllCollections });
  const categories = query?.data?.results;
  const collections = query1?.data?.results;

  const [product, setProduct] = useState({
    name: data?.name,
    price: data?.price,
    description: data?.description,
    category: data?.category,
    collection: data?.collection,
    stock_quantity: data?.stock_quantity,
    discount: data?.discount,
    images: data?.images,
    status: data?.status,
    sizes: data?.sizes || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const urls = await Promise.all(files.map(async (file) => {
        const imageRef = ref(storage, `Products/${file.name + uuidv4()}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      }));
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...urls],
      }));
    } catch (error) {
      setError('Error uploading images');
    }
    setLoading(false);
  };

  const removeImageInput = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProduct(data?.product_id, product);
      console.log('Product submitted:', product);
      handleClose()
      return res;
    } catch (error) {
      setError('Error submitting product');
    }
    setLoading(false);
  };

  return (
    <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold">Cập nhật sản phẩm</h2>
        <button onClick={handleClose} type="button">
          <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
        </button>
      </div>
      <div className="mt-4">
        <input type="text" name="name" value={product?.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
        <input type="number" name="price" value={product?.price} onChange={handleInputChange} placeholder="Price" className="w-full mb-2 px-3 py-2 border rounded" required />
        <textarea name="description" value={product?.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
        <input type="number" name="stock_quantity" value={product?.stock_quantity} onChange={handleInputChange} placeholder="Stock Quantity" className="w-full mb-2 px-3 py-2 border rounded" required />

        <select name="category" value={product?.category} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Chọn danh mục</option>
          {categories?.map((category, index) => (
            <option key={index} value={category?.category_id}>{category.name}</option>
          ))}
        </select>

        <select name="collection" value={product?.collection} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Chọn loại sản phẩm</option>
          {collections?.map((collection, index) => (
            <option key={index} value={collection.collection_id}>{collection.name}</option>
          ))}
        </select>
        <select name="status" value={product?.status} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Trạng thái sản phẩm</option>
          <option value={true}>Hoạt động</option>
          <option value={false}>Không hoạt động</option>
        </select>
        <input type="text" name="discount" value={product.discount} onChange={handleInputChange} placeholder="Discount" className="w-full mb-2 px-3 py-2 border rounded" />
        <div className="mt-4">
          <h3 className="text-[16px] font-semibold">Sizes</h3>
          {["XS", "SM", "M", "L", "XL", "2XL", "3XL", "4XL"].map((size, index) => (
            <label key={index} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={size}
                checked={product.sizes.includes(size)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    sizes: checked
                      ? [...prevProduct.sizes, value]
                      : prevProduct.sizes.filter((s) => s !== value),
                  }));
                }}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-[16px] font-semibold">Images</h3>
          {product?.images?.map((image, index) => (
            <div key={index} className="flex mb-2 items-center">
              <input type="text" value={image} readOnly className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeImageInput(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded">Remove</button>
            </div>
          ))}
          <input type="file" multiple onChange={handleImageUpload} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded" />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Cập nhật
        </button>
      </div>
    </form>
  )
}  

export default EditProductForm
