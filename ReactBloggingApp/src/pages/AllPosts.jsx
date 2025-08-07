import React, { useState, useEffect } from 'react';
import AppwriteService from '../appwrite/config';
import { PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        AppwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((error) => console.error("Failed to load posts", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-3">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Latest Articles
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Discover insights and tutorials from our community
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default AllPosts;