// app/[id]/edit/page.js
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import PostForm from '../../../components/PostForm';
import axios from 'axios';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`https://consumableai-assignment.onrender.com/api/posts/${id}`);
          setPost(response.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {post ? (
        <PostForm post={post} isEditMode={true} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPostPage;
