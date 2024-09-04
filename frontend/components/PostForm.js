// components/PostForm.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {errors.content && <p className="error-text">{errors.content}</p>}
      </label>
      <Button type="submit">{isEditMode ? 'Update Post' : 'Create Post'}</Button>
    </form>
  );
};

export default PostForm;
