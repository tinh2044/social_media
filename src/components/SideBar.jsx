import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai'

import logo from '../assets/img/logo.png'

import categories from '../utils/data'

const activeStyles = 'flex items-center px-5  gap-3  transition-all duration-200 ease-in-out font-extrabold border-r-2 border-black'
const notActiveStyles = 'flex items-center px-5  gap-3  transition-all duration-200 ease-in-out text-gray-500 hover:text-black'

const SideBar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    return (
        <nav className='flex flex-col justify-between bg-gray-100 h-full overflow-y-scroll w-full shadow-md' >
            <div className='flex flex-col'>
                {/* Logo */}
                <div className='flex items-center justify-between'>
                    <Link to='/'
                        className='flex px-5 gap-2 my-6 w-190 items-center'
                        onClick={() => handleCloseSidebar()}
                    >
                        <img alt='logo' src={logo} />
                    </Link>
                    {/* button close sidebar on mobile */}
                    <div className='w-12 h-12 rounded-full flex items-center justify-center md:hidden'>
                        <AiFillCloseCircle fontSize={40} color='#333' onClick={handleCloseSidebar} />
                    </div>
                </div>
                {/* Using NavLink to active current page */}
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? activeStyles : notActiveStyles}
                        onClick={handleCloseSidebar}

                    >
                        <RiHomeFill /> Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover category</h3>
                    {categories.slice(0, categories.length - 1).map(category => (
                        <NavLink
                            key={category.name}
                            to={`/categories/${category.name}`}
                            className={({ isActive }) => isActive ? activeStyles : notActiveStyles}
                            onClick={handleCloseSidebar}
                        >
                            <img alt='ctg' src={category.image} className='w-10 h-10 rounded-full' />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
                <hr className='my-2 bg-gray-400' style={{ height: '2px' }} />
            </div>
            {/* Avatar and name of user */}
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className='flex mb-5 gap-2 mx-3 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={user.avatar} className='w-10 h-10 rounded-full' alt='avatar' />
                    <p>{user.userName}</p>
                </Link>
            )}
        </nav>
    )
}

export default SideBar
