import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { useNavigate } from 'react-router-dom'

import LayzyLoad from '../../components/LazyLoad';
import { updateUser } from '../../redux/userSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastifyData, setToastifyData] = useState({ status: '', message: '' });
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const mutation = useMutationHook((data) => UserService.signIn(data));

  const handleSignin = () => {
    mutation.mutate({
      email,
      password
    });
  };

  useEffect(() => {
    if (mutation.data) {
      setToastifyData({
        status: mutation.data.status,
        message: mutation.data.message
      });
    }
  }, [mutation.data]);

  const { data, isPending, isSuccess } = mutation;
  useEffect(() => {
    if (toastifyData.status === 'success') {
      navigate('/')
      localStorage.setItem('accessToken', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decode = jwtDecode(data?.access_token)
        if (decode?.user_id) {
          handleGetUserDetails(decode?.user_id, data?.access_token)
        }

      }
    }
  }, [toastifyData.status])
  const handleGetUserDetails = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res, accessToken: token }))
  }
  return (
    <div className="py-16 bg-slate-100 min-h-screen">
      <div className="flex bg-white rounded-lg shadow-brand overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover relative"
          style={{ background: `url(${"https://cdn.techinasia.com/wp-content/uploads/2022/09/1662307723_coolmate.jpeg"})`, backgroundPosition: "center", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat" }}
        >
          <a href="/" className=' absolute top-2 left-2 size-[40px] bg-white rounded-full flex items-center justify-center'>
            <FontAwesomeIcon className=' absolute' icon={faArrowLeft} />
          </a>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Coolmate</h2>
          <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Đăng nhập với Google</h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">hoặc đăng nhập với email</a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Địa Chỉ Email</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mật Khẩu</label>
              <a href="#" className="text-xs text-gray-500">Quên mật khẩu?</a>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type='password'
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleSignin}
              className={`${(email && password) ? "bg-main hover:bg-blue-500" : "bg-gray-500 hover:bg-gray-400"} flex items-center justify-center text-white font-bold h-[45px] w-full rounded `}
            >
              {isPending && <LayzyLoad />}
              {!isPending && "Đăng nhập"}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span className='text-sm text-gray-500 font'>Chưa có tài khoản? <a href="/signup" className="text-main">Đăng ký</a></span>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignInPage;
