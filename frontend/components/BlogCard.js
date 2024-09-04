// components/BlogCard.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BlogCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://consumableai-assignment.onrender.com/api/posts/${post.id}`);
      router.reload(); // Reload the page to reflect the deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="blog-card">
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 100)}...</p>
      <Link href={`/${post.id}`}>Read More</Link>
      <button onClick={() => setShowModal(true)}>Delete</button>

      {showModal && (
        <div className="modal">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDelete}>Yes, delete</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
