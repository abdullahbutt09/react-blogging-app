import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { login } from '../store/AuthSlice'
import {Button , Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');

    const loginUser = async (data) => {
        setError('');
        try {
            console.log("Form data being sent to login:", data);
            const secession = await authService.login(data);
            if(secession){
                const userData = await authService.GetCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
  <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
    <div className="flex justify-center">
    </div>
    <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
      Sign in to your account
    </h2>
    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        Sign Up
      </Link>
    </p>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    <form onSubmit={handleSubmit(loginUser)} className=''>
        <div className=''>
            <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true,
            validate:{
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
                }
             })}
            />
            <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true,
            })}
            />

            <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
                Sign In
            </Button>
        </div>
    </form>
  </div>
</div>
  )
}

export default Login
