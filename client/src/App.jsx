import { Fragment, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import dotenv from 'dotenv'

import { publicRoutes } from './routes';
import { MainLayout } from './components/layouts';
import { useQuery } from '@tanstack/react-query';
import helpers from './utils/helper';
import * as UserService from '../src/services/UserService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/userSlice';


function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    const { decoded, storageData } = handleDecode()

    if (decoded?.user_id) {
      handleGetUserDetails(decoded?.user_id, storageData)
    }
  }, []);
  UserService.axiosJwt.interceptors.request.use(async (config) => {
    const currenrTime = new Date()
    let { decoded, storageData } = handleDecode()
    if (decoded?.exp < (currenrTime.getTime() / 1000)) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data.accessToken}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  const handleGetUserDetails = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    console.log(res);
    
    dispatch(updateUser({ ...res, accessToken: token }))
  }
  const handleDecode = () => {
    let storageData = localStorage.getItem('accessToken')
    let decoded = {}
    if (storageData && helpers.isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  // const fetchData = async () => {
  //   const res = await axios.get(`${import.meta.env.VITE_API}/get-products`);
  //   return res.data
  // };
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchData })


  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = MainLayout
          if (route.layout)
            Layout = route.layout
          else if (route.layout === null)
            Layout = Fragment
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </>
  )
}

export default App
