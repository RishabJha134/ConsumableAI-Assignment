// components/BlogCard.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BlogCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://consumableai-assignment.onrender.com/api/posts/${post.id}`);
      router.refresh(); // Reload the page to reflect the deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
      <div className="flex justify-between items-center mt-4">
        <Link href={`/${post.id}`} className="text-blue-500 hover:underline">Read More</Link>
        <div>
          <Link href={`/${post.id}/edit`} className="text-yellow-500 hover:underline mr-4">Edit</Link>
          <button onClick={() => setShowModal(true)} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, delete</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
