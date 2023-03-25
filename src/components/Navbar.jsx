import React from 'react'
import { IoIosAdd, IoMdSearch } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate()


    const handleSearch = () => {
        navigate(`/search/${searchTerm}`)
    }
    if (!user) return null
    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-2'>
            <div className="flex justify-start items-center w-full px-2  rounded-md bg-white outline-none border-none shadow-md focus-within:shadow-lg">

                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={searchTerm}
                    className=' w-full px-3 bg-white outline-none'
                />
                <IoMdSearch fontSize={30} className='mx-2 cursor-pointer' onClick={handleSearch} />
            </div>
            <div className=' flex gap-3 items-center '>
                <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                    <img src={user?.avatar} alt="avatar" />
                </Link>
                <Link to={`create-pin`} className='bg-black text-white rounded-lg w-12 h-12 md:w-14 flex justify-center items-center'  >
                    <IoIosAdd fontSize={30} />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
