import React from 'react';

const features = [
  {
    icon: "📚",
    title: "Wide Collection of Books",
    description: "From fiction to science, find every book you desire at your fingertips.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description: "Get your books delivered quickly and safely to your doorstep.",
  },
  {
    icon: "💰",
    title: "Affordable Prices",
    description: "Enjoy great books without breaking the bank.",
  },
];

const WhyBookCu = () => {
  return (
    <section className="bg-gradient-to-r from-primary rounded-t-4xl to-[#FBF9D1] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose <span className='text-primary font-serif'>BookCourier?</span></h2>
        <p className="text-lg mb-12">
          We make reading accessible, affordable, and enjoyable. Here’s why our customers love us:
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl p-6 hover:bg-opacity-20 transition duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookCu;
