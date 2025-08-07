import React from 'react'
import AppwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
  $id,
  title,
  featuredImage,
}) {
  // 🔽 This line is key
  const previewUrl = AppwriteService.getFileView(featuredImage);

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={previewUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating badge */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
              Read More
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
            {title}
          </h2>
          
          {/* Bottom accent */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Article
              </span>
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard;