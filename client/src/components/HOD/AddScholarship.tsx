import { useState } from "react";

function AddScholarship() {

  const [isFormOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <>
      <div>
        <button
          onClick={openForm}
          className="bg-[#9c231b] text-white text-xl rounded-lg px-4 py-2 font-semibold"
        >
          <span>Add Scholarship</span>
        </button>

        {/* Modal */}
        {isFormOpen && (
          <div className="flex fixed inset-0 justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="w-96 rounded-lg p-6 bg-white">
                    <h2 className="text-2xl font-semibold">Add Scholarship Details</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="" className="block my-2">Scholarship Name</label>
                            <input type="text" placeholder="Enter Scholarship Name" className="w-full p-2 rounded-lg border border-gray-300" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="block mb-2">Select Date: </label>
                            <input type="date" className="w-full p-2 rounded-lg border border-gray-300 mb-2"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Scholarship Amount</label>
                            <input type="text" placeholder="Enter Amount" className="w-full p-2 rounded-lg border border-gray-300 mb-2"/>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-[#9c231b] px-4 py-2 rounded-lg text-white" onClick={()=>closeForm()}>Cancel</button>
                            <button className="bg-green-500 px-4 py-2 rounded-lg text-white" onClick={()=>closeForm()}>Submit</button>
                        </div>
                    </form>
                </div>
          </div>
        )}
        <div>

        </div>
      </div>
    </>
  );
}

export default AddScholarship;
