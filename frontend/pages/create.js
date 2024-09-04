import axios from 'axios';
import { useRouter } from 'next/router';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

export default function Create() {
  const router = useRouter();

  const handleSubmit = async (post) => {
    try {
      await axios.post('https://consumableai-assignment.onrender.com', post);
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <PostForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}
