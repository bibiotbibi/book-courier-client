import React from "react";
import { ChevronDown } from "lucide-react"; // Import a professional icon

const faqs = [
  {
    question: "How long does book delivery take?",
    answer:
      "Delivery usually takes 2–5 business days depending on your location. Express delivery is also available.",
  },
  {
    question: "Are my books safely packaged?",
    answer:
      "Yes, we use waterproof and damage-resistant packaging to ensure your books arrive safely.",
  },
  {
    question: "Do you deliver rare or old books?",
    answer:
      "Yes, rare and valuable books receive extra protective packaging and special handling.",
  },
  {
    question: "Can I track my book delivery?",
    answer:
      "Yes, once shipped you will receive a tracking ID to track your order in real time.",
  },
  {
    question: "What if my book is damaged or lost?",
    answer:
      "We provide a replacement or refund according to our delivery policy.",
  },
  {
    question: "Do you offer nationwide delivery?",
    answer:
      "Yes, we provide nationwide and selected international delivery options.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Everything you need to know about our services, delivery, and policies.
        </p>
      </div>

      {/* Accordion Grid */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Question / Summary */}
            <summary className="flex cursor-pointer list-none items-center justify-between p-6 select-none">
              <span className="font-semibold text-lg text-gray-900 pr-4">
                {faq.question}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
            </summary>
            
            {/* Answer / Details */}
            <div className="px-6 pb-6 pt-0">
              <div className="h-px w-full bg-gray-100 mb-4 group-open:block hidden"></div>
              <p className="text-gray-600 leading-relaxed opacity-0 group-open:opacity-100 transition-opacity duration-500 delay-75">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;