const AdmissionForm = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#9c231b]">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Contact Number</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your contact number"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Parent's Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter parent's full name"
                pattern="^[a-zA-Z\s]+$"
                title="Please enter a valid name (letters and spaces only)."
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Parent's Contact Number
              </label>
              <input
                type="tel"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter parent's contact number"
                pattern="^\d{10}$"
                title="Please enter a valid 10-digit contact number."
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-1">
              Residential Address
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              rows={2}
              placeholder="Enter your address"
            ></textarea>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4 text-[#9c231b]">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Last Institution</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter the name of the institution"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Previous Score (%)
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your previous score"
                pattern="^(100(\.0{1,})?|[1-9]?[0-9](\.[0-9]{1})?)$"
                title="Enter a valid percentage between 0 and 100 (up to 1 decimal place)."
                required
              />
            </div>
          </div>

          <div className="mt-4">
            {/* TODO Dynamic Course */}
            <label className="block font-medium mb-1">Interested Course</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="course" className="mr-2" required />
                Bachelor of Science in Information Technology
              </label>
              <label className="flex items-center">
                <input type="radio" name="course" className="mr-2" required />
                Bachelor of Management Studies
              </label>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4 text-[#9c231b]">Document Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Passport-sized Photo
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
                <label className="p-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: any) => console.log(e.target.files[0])} //TODO - Handle File Upload
                  />
                  <p>Click to upload a file</p>
                  <p className="text-sm text-gray-500">Image file accepted</p>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Academic Marksheet
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
                <label className="p-1 cursor-pointer">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .pdf"
                    className="hidden"
                    onChange={(e: any) => console.log(e.target.files[0])} //TODO - Handle File Upload
                  />
                  <p>Click to upload a file</p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG PDF files accepted
                  </p>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Leaving Certificate
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
                <label className="p-1 cursor-pointer">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .pdf"
                    className="hidden"
                    onChange={(e: any) => console.log(e.target.files[0])} //TODO - Handle File Upload
                  />
                  <p>Click to upload a file</p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG PDF files accepted
                  </p>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Aadhar Card</label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
                <label className="p-1 cursor-pointer">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .pdf"
                    className="hidden"
                    onChange={(e: any) => console.log(e.target.files[0])} //TODO - Handle File Upload
                  />
                  <p>Click to upload a file</p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG PDF files accepted
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />I declare that all the
              information provided is true and correct. I agree to the terms and
              conditions.
            </label>
          </div>

          <button className="mt-6 w-full bg-[#9c231b] text-white py-2 px-4 rounded-lg hover:bg-[#502b28]">
            Submit Application
          </button>
    </div>
  )
}

export default AdmissionForm
