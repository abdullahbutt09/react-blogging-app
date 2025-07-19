import React from 'react'
import AppwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
  $id,
  title,
  featuredImage,
}) {
  return (
    <Link to={`/posts/${$id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img
            src={AppwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard