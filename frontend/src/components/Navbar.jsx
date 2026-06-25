import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  navigate("/");
};

  return (
    <nav className="bg-black text-white p-4">

      <div className="container mx-auto flex justify-between">

        <Link to="/">
          BookMyVenue
        </Link>

        <div className="space-x-4">

          <Link to="/">Home</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button   onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;