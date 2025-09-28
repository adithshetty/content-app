import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 flex-col">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
      <Link to="/content" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to Content
      </Link>
    </div>
  );
};

export default HomePage;
