import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"


const SearchBus = () => {

    const{register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) =>{
        console.log("Search data", data);
        navigate(
          `/routes/search?source=${data.from}&destination=${data.to}`
        );
    }
    return (
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Search Bus</h2>
  
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            {...register("from", {required : true})}
            placeholder="From"
            className="border p-2 rounded"
          />
  
          <input
          {...register("to", {required : true})}
            placeholder="To"
            className="border p-2 rounded"
          />
  
          <input
            {...register("date", {required : true})}
            type="date"
            className="border p-2 rounded"
          />
  
          <button className="bg-green-600 text-white p-2 rounded">
            Search
          </button>
        </form>
      </div>
    );
  };
  
  export default SearchBus;