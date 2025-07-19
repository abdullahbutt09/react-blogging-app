import React, {useState}from 'react' 
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';
import {Button , Input , Logo} from './index'
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { useNavigate , Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');

    const signupUser = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if(userData){
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
  <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
    <div className="flex justify-center">
      <span>
        <Logo width="120px" />
      </span>
    </div>

    <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
      Create a new account
    </h2>

    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        Sign In
      </Link>
    </p>

    {error && (
      <p className="text-red-500 text-sm text-center font-medium">{error}</p>
    )}

    <form onSubmit={handleSubmit(create)} className="space-y-4">
      <Input
        label="Name"
        placeholder="Enter your name"
        {...register("name", { required: true })}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password", { required: true })}
      />

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
      >
        Sign Up
      </Button>
    </form>
  </div>
</div>

  )
}

export default Signup
