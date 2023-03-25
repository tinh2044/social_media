/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react'
import { v4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'
import { Link, useNavigate } from 'react-router-dom'
const PinItem = ({ pin }) => {
    // set state when hover picture
    const [postHover, setPortHover] = useState(false)
    // set state when save a picture
    const [savingPost, setSavingPost] = useState(false)

    const navigate = useNavigate()
    // get user from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'))

    // check if user already save
    const alreadySaved = !!(pin?.save?.filter(item => item.postedBy._id === userInfo.sub))?.length

    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true);

            /* Saving the post to the database. */
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: v4(),
                    userId: userInfo.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userInfo.sub
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                    setSavingPost(false)
                })

        }
    }
    const deletePin = (id) => {
        client.delete(id).then(() => { window.location.reload() })
    }
    return (
        <div className='m-2 '>

            <div
                onMouseEnter={() => setPortHover(true)}
                onMouseLeave={() => setPortHover(false)}
                onClick={() => navigate(`/pin-detail/${pin._id}`)}
                className="relative cursor-zoom-in w-full hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
            >

                <img className='w-full rounded-md' src={urlFor(pin.image).width(240).url()} alt='picture' />
                {
                    postHover && (
                        <div
                            className='absolute  top-0 w-full h-full flex flex-col justify-between p-2 pl-1 z-50'
                            style={{ height: '100%' }}
                        >
                            <div
                                className='flex items-center  justify-between '
                            >
                                <div className='flex gap-2'>
                                    <a href={`${pin.image?.asset?.url}?dl`}
                                        download={true}
                                        onClick={(e) => e.stopPropagation()}
                                        className='bg-white w-10 h-10 rounded-full flex items-center justify-center text-black text-xl opacity-75'
                                    >
                                        <MdDownloadForOffline />
                                    </a>
                                </div>
                                {
                                    alreadySaved ? (
                                        <button type='button'
                                            className='bg-red-500 
                                           opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center'
                                        >
                                            Saved
                                        </button>)
                                        : (
                                            <button type='button'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    savePin(pin._id)
                                                }}
                                                className='bg-red-500 opacity-70
                                                 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center'>
                                                {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                            </button>
                                        )
                                }
                            </div>
                            <div
                                className='flex justify-between items-center gap-2 w-full'
                            >
                                {pin?.destination && (
                                    <a href={pin?.destination}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className='bg-white flex items-center gap-2 text-black font-bold p-2 pr-4 opacity-70 hover:opacity-100 hover:shadow-md'
                                    >{pin?.destination.length > 20 ? pin?.destination.slice(8, 20) : pin?.destination.slice(8)}</a>
                                )}
                                {pin?.postedBy._id === userInfo.googleId && (
                                    <button
                                        className='bg-white opacity-70
                                                 hover:opacity-100 text-black font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deletePin(pin._id)
                                        }}
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                )}
                            </div>
                        </div>

                    )
                }
            </div>
            <Link to={`/user-profile/${pin?.postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                <img className='w-8 h-8 rounded-full object-cover' src={pin?.postedBy.avatar} />
                <p className='font-semibold capitalize'>{pin?.postedBy.userName}</p>
            </Link>
        </div>
    )
}

export default PinItem
