import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { registerUser } from './api';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          type='text'
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("email")}
          type='email'
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-pink-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register