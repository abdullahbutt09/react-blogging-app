import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import { 
  Edit3, 
  Trash2, 
  Calendar, 
  ArrowLeft, 
  User
} from "lucide-react";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = React.useMemo(() => {
    return post && userData ? post.userId === userData.$id : false;
  }, [post, userData]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost({ postId: slug }).then((post) => {
                if (post) {
                    console.log("📦 setPost response:", post); // 🔽 ALSO LOG HERE
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.DeletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

return post ? (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200 text-white" />
          <span className="text-white">Back to Posts</span>
        </button>

        {/* Main Content Card */}
        <article className="bg-gray-700 rounded-lg shadow-sm overflow-hidden border border-gray-200">
          
          {/* Header Section */}
          <header className="p-8 pb-6 border-b border-gray-100">
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                {/* Post Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {/* Post Meta Information */}
                <div className="flex flex-wrap items-center gap-5 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar size={16} />
                    <span>{formatDate(post.$createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Author Action Buttons */}
              {isAuthor && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate(`/edit-post/${post.$id}`)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={deletePost}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <div className="p-8 pt-6">
            <div className="relative group">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 pb-8 text-white">
          <div 
            className="prose max-w-none prose-headings:text-white prose-p:text-white prose-li:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        </article>
      </div>
    </div>
  ) : null
}

