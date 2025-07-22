import React , {useEffect , useState} from 'react'
import { PostForm } from '../components'
import { AppwriteService } from '../appwrite/config'
import { useParams , useNavigate } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            AppwriteService.getPost({postId: slug}).
            then((post) => {
                if(post){
                    setPost(post);
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'));
        }
    } , [slug , navigate])
  return post ? (
    <div>
        <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost
