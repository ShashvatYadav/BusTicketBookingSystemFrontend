import { useForm } from "react-hook-form";
import api from "../../services/axiosInstance";

const AddBus = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/admin/add-bus", data);
      alert("Bus Added Successfully");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Add Bus</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("source", { required: true })}
          placeholder="Source"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("destination", { required: true })}
          placeholder="Destination"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("busName", { required: true })}
          placeholder="Bus Name"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("totalSeat", { required: true })}
          type="number"
          placeholder="Total Seats"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Add Bus
        </button>

      </form>
    </div>
  );
};

export default AddBus;