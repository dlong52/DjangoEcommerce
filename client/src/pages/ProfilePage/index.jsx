import React, { useRef, useState } from 'react'
import { userAvatar } from '../../assets'
import { useSelector } from 'react-redux';
import { updateUser } from '../../services/UserService';

const ProfilePage = () => {
    const user = useSelector((state) => state?.user)
    console.log(user);
    const [avatar, setAvatar] = useState(userAvatar)
    const fileInputRef = useRef(null);
    const handleUpdateUser = async () => {
        const res = await updateUser()
        
    }
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex-1 bg-white rounded-[5px] p-5'>
            <div className="">
                <h1 className="text-[20px] font-bold pb-3 border-b-2">Quản lý thông tin hồ sơ</h1>
            </div>
            <div className="flex justify-between">
                <div className="">
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Họ tên:</label>
                        <input className='min-w-[400px] h-[35px] shadow-input rounded-[5px] pl-4 outline-none' type="text" defaultValue={user?.username} />
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Email:</label>
                        <input className='min-w-[400px] h-[35px] shadow-input rounded-[5px] pl-4 outline-none' type="text" defaultValue={user?.email} />
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Số điện thoại:</label>
                        <input className='min-w-[400px] h-[35px] shadow-input rounded-[5px] pl-4 outline-none' type="text" defaultValue={user?.phone_number} />
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Địa chỉ:</label>
                        <div className="">
                            {user?.address && <span className='text-[18px] font-medium'>{user?.address}</span>}
                            <a className='font- text-main ml-3 underline' href="/profile/address">{user?.address ? "Thay đổi" : "Thêm địa chỉ"}</a>
                        </div>
                    </div>
                    <div className="flex mt-[20px]">
                        <button className='px-6 py-2 rounded-[5px] bg-main text-white'>Lưu</button>
                    </div>
                </div>
                <div className="flex justify-center flex-1">
                    <div className="flex flex-col items-center gap-y-2 mt-[30px]">
                        <img src={avatar} alt="Avatar" className='bg-gray-400 rounded-full w-[80px] aspect-square object-cover' />
                        <input
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <button
                            className='border-gray-800 border-[2px] py-[5px] px-[10px] rounded-[5px] font-medium'
                            onClick={handleButtonClick}
                        >
                            Chọn ảnh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
