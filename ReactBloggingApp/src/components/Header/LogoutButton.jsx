import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/AuthSlice';
import authService from '../../appwrite/auth';


function LogoutButton() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logout()
        //catch any errors here
        .then(() =>{
            dispatch(logout())
        })
    }
  return (
<button
onClick={handleLogout} 
className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
  Logout
</button>
  )
}

export default LogoutButton;