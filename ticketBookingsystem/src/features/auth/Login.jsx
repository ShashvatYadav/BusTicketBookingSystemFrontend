import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUser } from "./api";
import api from "../../services/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const {register, handleSubmit } = useForm();
  const {login, setUser} = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
      try{
        const res = await loginUser(data);
        login(res.data.token);

        const profile = await api.get("/user/profile");
        setUser(profile.data);
        console.log(profile.data.role)

        if (profile.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } catch(error){
        console.log(error);
      }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;