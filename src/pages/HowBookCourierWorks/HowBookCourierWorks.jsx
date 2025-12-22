import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, MapPin, CheckCircle } from "lucide-react";

const HowBookCourierWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Package size={40} className="text-primary" />,
      title: "Book a Pickup",
      desc: "Schedule a convenient time for us to collect your books.",
    },
    {
      id: 2,
      icon: <Truck size={40} className="text-primary" />,
      title: "We Collect Your Parcel",
      desc: "Our professional courier picks up your parcel safely.",
    },
    {
      id: 3,
      icon: <MapPin size={40} className="text-primary" />,
      title: "Tracked & Dispatched",
      desc: "Your parcel moves through our secure system with live tracking.",
    },
    {
      id: 4,
      icon: <CheckCircle size={40} className="text-primary" />,
      title: "Delivered Safely",
      desc: "Fast and secure delivery to your recipient.",
    },
  ];

  return (
    <section className="py-20 bg-[#FBF9D1]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          How <span className="text-primary">BookCourier</span> Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our simple 4-step process ensures your books are delivered safely and on time.
        </p>

        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBookCourierWorks;
