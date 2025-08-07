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
  Clock,
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
    const isAuthor = post && userData ? post.userId === userData.$id : false;

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

//     return post ? (
//         <div className="py-8">
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.getFileView(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                 </div>
//         </div>
//     ) : null;
// }

return post ? (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Posts</span>
        </button>

        {/* Main Content Card */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          
          {/* Header Section */}
          <header className="p-8 pb-6 border-b border-gray-100">
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                {/* Post Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {/* Post Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">{post.author || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(post.$createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime || "5 min read"}</span>
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
          <div className="px-8 pb-8">
            <div 
              className="prose prose-lg max-w-none
                         prose-headings:text-gray-900 prose-headings:font-semibold
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:text-gray-700 prose-ul:pl-6
                         prose-li:text-gray-700 prose-li:mb-2
                         prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                         prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-800
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:my-6 prose-blockquote:rounded-r-md
                         prose-blockquote:text-blue-900 prose-blockquote:italic"
              // Replace with: dangerouslySetInnerHTML={{ __html: post.content }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  ) : null
}

