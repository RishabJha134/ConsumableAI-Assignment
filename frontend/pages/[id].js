import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Post({ post }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://consumableai-assignment.onrender.com/api/posts/${post.id}`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete Post
        </button>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`https://consumableai-assignment.onrender.com/api/posts/${params.id}`);
    return {
      props: {
        post: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: {
        post: {},
      },
    };
  }
}
