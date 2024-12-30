import { ChevronDown } from "lucide-react";
import { useState } from "react";

const AdmissionHelp = () => {
  // Sample FAQ Data
  const faqs = [
    {
      question: "FAQ1",
      answer: "Answer",
    },
    {
      question: "FAQ2",
      answer: "Answer",
    },
    {
      question: "FAQ3",
      answer: "Answer",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#9c231b]">Help & Support</h2>

      {/* FAQs Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h3>
        <div className="">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 mb-4">
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer py-3"
              >
                <span className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openFAQ === index && (
                <div className="pl-6 pb-3 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info Section */}
      <div>
        {/* TODO Dynamic contact info */}
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Phone:</strong> +91 91753 12345
          </li>
          <li>
            <strong>Email:</strong> support@college.com
          </li>
          <li>
            <strong>Address:</strong> Samrat, Vile Parle
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdmissionHelp;
