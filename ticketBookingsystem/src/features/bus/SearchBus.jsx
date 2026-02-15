const SearchBus = () => {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Search Bus</h2>
  
        <div className="grid gap-4">
          <input
            placeholder="From"
            className="border p-2 rounded"
          />
  
          <input
            placeholder="To"
            className="border p-2 rounded"
          />
  
          <input
            type="date"
            className="border p-2 rounded"
          />
  
          <button className="bg-green-600 text-white p-2 rounded">
            Search
          </button>
        </div>
      </div>
    );
  };
  
  export default SearchBus;