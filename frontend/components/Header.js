import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Platform</h1>
        <nav>
          <Link href="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link href="/create" className="hover:underline">
            Create Post
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
