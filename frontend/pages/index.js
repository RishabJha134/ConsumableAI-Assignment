import axios from 'axios';
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://consumableai-assignment.onrender.com/api/posts');
    return {
      props: {
        posts: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
