import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Truck, MapPinned } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Books",
    value: "5K+",
    icon: BookOpen,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Happy Readers",
    value: "2K+",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Books Delivered",
    value: "3.5K+",
    icon: Truck,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: 4,
    title: "Cities Covered",
    value: "25+",
    icon: MapPinned,
    gradient: "from-sky-500 to-cyan-500",
  },
];

const Statistics = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#FBF9D1] via-primary to-secondary overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple- rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BookCourier Impact
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our growth, trust, and commitment to readers
            across the country.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-3xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-r ${stat.gradient}`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <h3 className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>

                {/* Title */}
                <p className="text-lg text-gray-300 font-medium">
                  {stat.title}
                </p>

                {/* Bottom Glow */}
                <div
                  className={`absolute inset-x-0 -bottom-1 h-1 rounded-b-3xl  ${stat.gradient}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
