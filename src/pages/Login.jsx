

/* Importing the necessary modules. */
import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import backgroundVideo from '../assets/video/share.mp4'
import logo from '../assets/img/logowhite.png'
import jwtDecode from 'jwt-decode'
import { client } from '../client.js'
const Login = () => {

    /* A hook that allows you to navigate to a different page. */
    const navigate = useNavigate()

    // a response of google when login successful
    const responseGoogle = (res) => {

        /* Decoding the JWT token that is returned from Google. */
        const response = jwtDecode(res.credential)
        /* Saving the user's information in the browser's local storage. */
        localStorage.setItem('user', JSON.stringify(response))

        const { name, sub: googleId, picture } = response

        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            avatar: picture
        }

        //     /* Creating a new user in the database if the user does not exist. */
        client.createIfNotExists(doc)
            /* Redirecting the user to the home page after a successful login. */
            .then(() => {
                console.log('Login successful');
                navigate('/', { replace: true })

            })/* Catching any errors that may occur during the login process. */
            .catch(err => console.log(err))
    }


    return (
        <div className='flex justify-start flex-col h-screen '>
            {/* Video background */}
            <div className='relative w-full h-full'>
                <video

                    src={backgroundVideo}
                    type='video/mp4'
                    loop={true}
                    controls={false}
                    muted={true}
                    autoPlay={true}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center inset-0  bg-blackOverlay'>
                <div className='p-5'>
                    <img alt='logo' src={logo} width='130px' />
                </div>

                <div className='shadow-2xl'>
                    {/* Login using google */}
                    <GoogleOAuthProvider
                        clientId="227835487602-57sgjplgk8ugntefk8ehpbeersc9q7tq.apps.googleusercontent.com"
                    >

                        <GoogleLogin

                            /* A render prop. It is a function that returns a React element. */
                            render={(renderProps) => (
                                <button type='button'
                                    className='bg-mainColor flex justify-center items-center p-3  rounded-lg outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className='mr-4' />
                                    Sign in with Google
                                </button>
                            )}
                            /* A function that is called when the login is successful. */
                            onSuccess={responseGoogle}
                            onFailure={() => { 'login failed' }}
                            /* A property of the GoogleLogin component. It is used to specify the
                            cookie policy. */
                            cookiePolicy='single_host_origin'
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    )
}

export default Login
