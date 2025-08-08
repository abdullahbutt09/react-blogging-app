import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { PostCard } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status); // Add this line
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (!authStatus) {
    return (
    <div className="w-full py-16 mt-8 text-center ">
      <div className="flex flex-wrap justify-center">
        <div className="p-8 w-full max-w-md mx-auto">
          
          {/* Lock Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          
          {/* Text */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            Login to read posts
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join our community to access exclusive content and amazing stories
          </p>
          
          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Get Started
          </button>
          
        </div>
      </div>
    </div>
  );
}
    return (
        <div className="w-full py-8">
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default Home;