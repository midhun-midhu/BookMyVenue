import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      console.log(data);

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded-lg shadow-md space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="text-center">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 hover:underline"
  >
    Register here
  </Link>
</p>

      </form>

    </div>
  );
}

export default LoginPage;