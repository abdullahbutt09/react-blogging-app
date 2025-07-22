import React, { use } from 'react'
import { AppwriteService } from '../appwrite/config'
import { PostCard } from '../components'
import { useState , useEffect } from 'react'
function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        AppwriteService.getPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, []);
  return (
    <div>
        {posts.map((post) => {
            <div key={post.$id}>
                <PostCard post={post} />
            </div>
        })}
    </div>
  )
}

export default AllPosts
