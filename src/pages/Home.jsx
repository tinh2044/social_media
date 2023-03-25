import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import logo from '../assets/img/logo.png'
import { Pins, SideBar, UserProfile } from '../components'
import { getUser } from '../utils/service'

const Home = () => {

    // navigate to another page
    const navigate = useNavigate()

    /* Creating a state variable called `toggleSideBar` and a function called `setToggleSideBar` that
    can be used to update the state variable. */
    const [toggleSideBar, setToggleSideBar] = useState(false)

    /* Creating a state variable called `user` and a function called `setUser` that can be used to
    update the state variable. */
    const [user, setUser] = useState({})

    /* Getting the user from local storage. */
    const userInfo = JSON.parse(localStorage.getItem('user')) || {}
    // console.log(userInfo)
    /* Creating a reference to the div with the className of `pb-2 flex-1 h-screen overflow-scroll` */
    const scrollRef = useRef()


    // if has no account login, navigate to login page	
    if (userInfo.name === undefined) {
        navigate('/login')
    }

    /* A React hook that is used to perform side effects in a functional component. It is called after
    every render. */
    // Get current user
    useEffect(() => {
        // get user account from sanity 
        getUser(userInfo.sub).then((res) => setUser({ ...res, avatar: userInfo.picture }))
    }, [userInfo.sub])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)


    }, [])

    return (
        <main className='flex md:flex-row flex-col h-screen bg-gray-50 transition-height duration-75 ease-out relative'>

            {/* Sidebar for laptop and desktop */}
            <div className='hidden md:flex flex-initial h-screen w-2/12'>
                <SideBar user={user} closeToggle={setToggleSideBar} />
            </div>
            {/* Sidebar for mobile and tablet  */}
            <div className='flex md:hidden flex-row'>
                <div className='flex w-full items-center justify-around p-2 shadow-md'>

                    <HiMenu className='cursor-pointer' fontSize={40} onClick={() => setToggleSideBar(true)} />
                    <Link to='/'>
                        <img alt='logo' src={logo} className='w-28' />
                    </Link>
                    {/* Link to user page */}
                    <Link to={`/user-profile/${user?._id}`}>
                        <img alt='logo' src={user?.avatar} className='w-12 rounded-full' />
                    </Link>
                </div>
                {/* Toggle bar */}
                {toggleSideBar && (
                    <div className=' absolute flex w-4/5 bg-slate-50 h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full h-full  flex justify-end items-center p-2'>
                            <SideBar user={user} closeToggle={setToggleSideBar} />
                        </div>
                    </div>)}
            </div>

            <div className='pb-2 flex-1 h-screen overflow-scroll' ref={scrollRef}>
                <Routes>
                    <Route path='/user-profile/:userId' element={<UserProfile />} />
                    <Route path='/*' element={<Pins user={user} />} />
                </Routes>
            </div>
        </main>
    )
}

export default Home
