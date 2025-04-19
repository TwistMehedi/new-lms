import React, {useState} from "react";
import { useRegisterUserMutation } from "../../features/user/userApi";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Registere successfully');

export default function Register() {

   const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
   });

   const [registerUser, { isLoading, isError, error, data }] = useRegisterUserMutation();

   const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


    const handleSubmit =async(e) => {
    e.preventDefault();
    console.log("Registering with", register);
    try {

      await registerUser(register);
      setRegister({ email: "", name: "", password: "" });
      notify()
  } catch (error) {
    console.error("Register failed:", error);
    toast.error(error.data?.message);
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 shadow-md p-6 w-96">
      <Toaster />
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={register.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              value={register.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
}
