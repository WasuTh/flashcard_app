import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to='/'>
        <div className="logo text-xl font-bold text-blue-600">
          MyLogo
        </div>
      </Link>

      <div className="space-x-4">
        <Link to='/login'>
          <button className="btn-nav text-blue-600 font-medium hover:underline">
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button className="btn-nav bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;