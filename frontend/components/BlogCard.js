import Link from 'next/link';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-zinc-400 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
      <Link href={`/${post.id}`} className="text-blue-500 hover:underline">
        Read more
      </Link>
    </div>
  );
};

export default BlogCard;
