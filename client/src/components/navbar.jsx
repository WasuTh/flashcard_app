const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo ด้านซ้าย */}
      <div className="logo text-xl font-bold text-blue-600">
        MyLogo
      </div>

      {/* ปุ่ม Login และ Sign Up ด้านขวา */}
      <div className="space-x-4">
        <button className="btn-nav text-blue-600 font-medium hover:underline">
          Login
        </button>
        <button className="btn-nav bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;