import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📦",
    title: "Built for Books",
    text: "We don’t treat books like normal parcels. Every shipment is packed, stacked, and handled to protect pages, covers, and bindings.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: "🚚",
    title: "Nationwide Delivery",
    text: "From authors shipping to readers to publishers sending bulk orders, our courier network covers cities and remote areas alike.",
    image:
      "https://i.ibb.co/Pvd3sHY9/Machine-Learning-na-log-stica-transformando-o-e-commerce-com-intelig-ncia-e-efici-ncia-Descubra.jpg",
  },
  {
    icon: "📚",
    title: "Trusted by Book People",
    text: "Writers, bookstores, libraries, and publishers choose BookCourier because we understand the value of books.",
    image:
      "https://i.ibb.co/CpMx23y8/rosexlvnn-books.jpg",
  },
];

const WhyBookCu = () => {
  return (
    <section className="bg-[#FBF9D1] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Why Choose BookCourier?
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            A courier service designed for books — not groceries, not gadgets,
            just safe and reliable book delivery.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden shadow-xl group"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition"></div>

              {/* Content */}
              <div className="relative p-8">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F3ECE4] rounded-xl text-3xl mb-6 shadow-md">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {item.text}
                </p>

                <div className="mt-6 h-[3px] w-10 bg-[#C4A484] rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookCu;
