import { Link } from "react-router-dom";

const AdmissionGuidelines = () => {
  const courseQualifications = [
    {
      courseName: "Bachelor of Science in Information Technology",
      qualification: "Minimum 60% in HSC & 75 Marks in Mathematics",
    },
    {
      courseName: "Bachelor of Management Studies",
      qualification: "Minimum 55% in HSC (Commerce stream)",
    },
    {
      courseName: "Bachelor of Arts in Psychology",
      qualification: "Minimum 50% in HSC (Arts stream)",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#9c231b] text-center">
          Admission Guidelines
        </h2>

        {/* Minimum Academic Qualification */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Minimum Academic Qualification
          </h3>
          {/* Table for Course Qualifications */}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Course Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Minimum Qualification
                </th>
              </tr>
            </thead>
            <tbody>
              {courseQualifications.map((course, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {course.courseName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.qualification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Required Documents */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Passport-sized Photo (JPG, JPEG, PNG Allowed)</li>
            <li>Previous Academic Marksheet (JPG, JPEG, PNG, PDF Allowed) </li>
            <li>
              School/College Leaving Certificate (JPG, JPEG, PNG, PDF Allowed)
            </li>
            <li>Aadhar Card (JPG, JPEG, PNG, PDF Allowed)</li>
          </ul>
        </section>

        {/* Steps in the Admission Process */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Steps in the Admission Process
          </h3>
          <ol className="list-decimal pl-5 text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Step 1:</span> Fill out the
              admission form online and upload the required documents
              (passport-sized photo, previous marksheet, leaving certificate,
              Aadhar card).
            </li>
            <li>
              <span className="font-medium">Step 2:</span> Bring the hard copies
              of the uploaded documents to the college premises and submit them
              at the designated counter.
            </li>
            <li>
              <span className="font-medium">Step 3:</span> The document
              verification admin will review the submitted documents offline.
              Upon approval, the fee payment page will be activated for the
              applicant.
            </li>
            <li>
              <span className="font-medium">Step 4:</span> Pay the fees through
              the portal and download/print the payment receipt for future
              reference.
            </li>
          </ol>
        </section>

        {/* Additional Notes */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Ensure all documents are original and valid at the time of offline
              submission.
            </li>
            <li>
              Fee payment is only available after successful document
              verification.
            </li>
            <li>
              Visit the{" "}
              <Link to="admission/help" className="underline inline-flex">
                Help & Support{"  "}
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="12"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </Link>{" "}
              section for FAQs and contact information.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdmissionGuidelines;
