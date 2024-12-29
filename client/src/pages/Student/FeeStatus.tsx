// FeeDetail.tsx
import React from "react";
import Navbar from "./Navbar";

const FeeStatus: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-semibold">Fee Status</h1>
          </div>

          {/* Fee Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Fee</p>
              <p className="text-lg font-bold">₹125,000</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Paid Amount</p>
              <p className="text-lg font-bold">₹75,000</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Balance Due</p>
              <p className="text-lg font-bold">₹50,000</p>
              <p className="text-xs text-gray-500">Due by 31/12/2024</p>
            </div>
          </div>

          {/* Wallet Balance Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
              <p className="text-lg font-bold mb-2 sm:mb-0">₹5,000</p>
              <div className="space-y-2 sm:space-y-0 sm:space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
                  Add Funds
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
                  Pay with Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Amount</th>
                    <th className="border border-gray-200 px-4 py-2">Transaction ID</th>
                    <th className="border border-gray-200 px-4 py-2">Method</th>
                    <th className="border border-gray-200 px-4 py-2">Status</th>
                    <th className="border border-gray-200 px-4 py-2">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">23/12/2024</td>
                    <td className="border border-gray-200 px-4 py-2">₹50,000</td>
                    <td className="border border-gray-200 px-4 py-2">TXN123456</td>
                    <td className="border border-gray-200 px-4 py-2">WALLET</td>
                    <td className="border border-gray-200 px-4 py-2 text-green-500">SUCCESS</td>
                    <td className="border border-gray-200 px-4 py-2 text-blue-500 underline cursor-pointer">Download</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">21/12/2024</td>
                    <td className="border border-gray-200 px-4 py-2">₹25,000</td>
                    <td className="border border-gray-200 px-4 py-2">TXN123457</td>
                    <td className="border border-gray-200 px-4 py-2">WALLET</td>
                    <td className="border border-gray-200 px-4 py-2 text-green-500">SUCCESS</td>
                    <td className="border border-gray-200 px-4 py-2 text-blue-500 underline cursor-pointer">Download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Support</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">For fee-related queries:</p>
              <p className="text-sm font-medium">demo@egov.com</p>
              <p className="text-sm font-medium">+91-97135 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStatus;
