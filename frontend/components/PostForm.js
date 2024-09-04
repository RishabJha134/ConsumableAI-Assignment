// components/PostForm.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Button from './Button';

const PostForm = ({ post = {}, isEditMode = false }) => {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditMode) {
        await axios.put(`https://consumableai-assignment.onrender.com/api/posts/${post.id}`, { title, content });
      } else {
        await axios.post('https://consumableai-assignment.onrender.com/api/posts', { title, content });
      }
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.title ? 'border-red-500' : ''
          }`}
          placeholder="Enter the title"
        />
        {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.content ? 'border-red-500' : ''
          }`}
          placeholder="Enter the content"
        />
        {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
      </div>
      <Button type="submit">{isEditMode ? 'Update Post' : 'Create Post'}</Button>
    </form>
  );
};

export default PostForm;
