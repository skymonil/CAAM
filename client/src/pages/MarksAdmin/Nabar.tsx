const handleLogout = () => {
  window.location.href = "/log-in";
};

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <i className="fas fa-user"></i>
        <div className="ml-2 text-lg font-semibold">Marks Admin</div>{" "}
        {/* Name */}
      </div>
      <button
        className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        onClick={handleLogout}
      >
        <i className="fas fa-right-from-bracket"></i>
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
