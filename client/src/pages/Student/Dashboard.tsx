import Navbar from "./Navbar"; 

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>

          {/* User Info */}
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 mb-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 sm:mb-0"></div>
            <div>
              <h3 className="text-xl font-semibold">Chirag Varu</h3>
              <p className="text-gray-600">Course: BSc IT</p>
              <p className="text-gray-600">Year: 2</p>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* First Row (DOB, Gender, Status) */}
            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Date of Birth</span>
                <div className="text-gray-600">Dec 9, 2005</div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Gender</span>
                <div className="text-gray-600">Male</div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Status</span>
                <div className="text-gray-600">Active</div>
              </div>
            </div>

            {/* Second Row (College) */}
            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4 col-span-2 sm:col-span-1">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">College</span>
                <div className="text-gray-600">SVKM UPG</div>
              </div>
            </div>

            {/* Third Row (Address) */}
            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4 col-span-2 sm:col-span-1">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Address</span>
                <div className="text-gray-600">[Student's Address]</div>
              </div>
            </div>

            {/* Fourth Row (Mobile, Email) */}
            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Mobile</span>
                <div className="text-gray-600">[Student's Mobile]</div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-600">Email</span>
                <div className="text-gray-600">[Student's Email]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
