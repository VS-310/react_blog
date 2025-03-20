import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getAccount()
      .then((userData) => {
        if (userData) {
          // console.log("Dispatching login:", userData);
          dispatch(login({ userData }));
        } else {
          // console.log("Dispatching logout");
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default App
