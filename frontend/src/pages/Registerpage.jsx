import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

function RegisterPage() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

    const data = await registerUser(formData);

    console.log("SUCCESS:", data);

    alert("Registration Successful");

  } catch (error) {

    console.log("ERROR:", error.response?.data);

    alert("Registration Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded-lg shadow-md space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login here
          </Link>
        </p>

      </form>

    </div>
  );
}

export default RegisterPage;