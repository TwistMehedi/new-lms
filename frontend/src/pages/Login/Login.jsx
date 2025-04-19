import React, { useState } from "react";
import { useLoginUserMutation } from "../../features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
 

const notify = () => toast("Login successed");

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [loginUser]= useLoginUserMutation();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response) {
        notify();
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      };
     
    } catch (error) {
      toast.error(error.data.message,"Login failed. Please check your credentials.");
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 shadow-md p-6 w-96">
        <Toaster />
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
};