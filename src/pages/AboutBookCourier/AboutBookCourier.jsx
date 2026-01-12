import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Truck, MapPinned } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Adjust path as needed
import { Link } from "react-router";

// Helper to format numbers (e.g. 5000 -> 5K+)
const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + "K+";
  }
  return num + "+";
};

const statsConfig = [
  {
    id: 1,
    title: "Total Books",
    key: "books",
    icon: BookOpen,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Happy Readers",
    key: "users",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Books Delivered",
    key: "orders",
    icon: Truck,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: 4,
    title: "Cities Covered",
    key: "cities",
    icon: MapPinned,
    gradient: "from-sky-500 to-cyan-500",
  },
];

const AboutBookCourier = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch real stats from backend
  const { data: statsData = {}, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stats');
      return res.data;
    },
  });

  // Map the config to include real values
  const displayStats = statsConfig.map((stat) => ({
    ...stat,
    value: formatNumber(statsData[stat.key]), // Get value from backend
  }));

  return (
    <section className="relative bg-[#FBF9D1] py-32 bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Background Image */}
      
      
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT COLUMN: Image + Skills Bar (Matching Screenshot Style) */}
        <div className="flex flex-col gap-8">
          
          {/* Main Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
          >
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80"
              alt="Book Courier Workspace"
              className="rounded-2xl w-full h-[400px] object-cover transform transition duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* "Our Skills" Section (Adapted for Courier Capabilities) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
              Our Capabilities
            </h3>

            {/* Skill 1 */}
            <div className="mb-5">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-gray-500">Logistics Network</span>
                <span className="text-primary">95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="mb-5">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-gray-500">Packaging Safety</span>
                <span className="text-primary">99%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="mb-5">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-gray-500">Express Delivery</span>
                <span className="text-primary">88%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            {/* Skill 4 */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-gray-500">Publisher Support</span>
                <span className="text-primary">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Content + Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-primary border-b-2 w-50 text-center font-bold tracking-widest uppercase mb-4 block text-sm">
            About Book Courier
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-500 mb-6">
            We Deliver Stories <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-primary">
              Not Just Packages
            </span>
          </h2>

          <p className="mt-6 text-gray-500 text-lg md:text-xl leading-relaxed">
            BookCourier is built exclusively for books. From writers sending
            manuscripts to publishers shipping thousands of copies, we ensure
            every book is delivered with care, speed, and protection.
          </p>

          {/* Stats Grid (Integrated from Statistics Component) */}
          <div className="mt-12">
            <h3 className="text-black border-primary border-x-2 w-80 mx-auto font-semibold tracking-wide uppercase text-sm mb-6 flex items-center gap-3">
              <span className="w-10 h-6    text-black"></span>
              BookCourier Impact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-3xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-all group overflow-hidden"
                  >
                    {/* Icon Box */}
                    <div
                      className={`w-14 h-14 mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-black" />
                    </div>

                    {/* Value */}
                    <h3 className="text-3xl font-bold text-black mb-1">
                      {isLoading ? "..." : stat.value}
                    </h3>

                    {/* Title */}
                    <p className="text-base text-gray-500 font-medium">
                      {stat.title}
                    </p>

                    {/* Bottom Glow Gradient */}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 rounded-b-3xl ${stat.gradient}`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <Link to="/all-books">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 px-8 py-4 bg-primary shadow-black/40 shadow-lg text-white rounded-full font-bold hover:bg-primary/90 transition flex items-center gap-2"
            >
            Explore
          </motion.button>
              </Link>
        </motion.div>
      </div>
      {/* Bottom Slogan Bar */}
     <section className="relative py-20 border-t border-white/10 mt-24">
  {/* Background Image */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80')",
    }}
  ></div>
  {/* Dark Overlay */}
  <div className="absolute inset-0 z-10 bg-black/70"></div>

  {/* Content */}
  <div className="relative z-20 max-w-4xl mx-auto text-center px-6">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
      "We Are Always Ready To Deliver A{" "}
      <span className="text-secondary">Perfect Story</span>"
    </h2>
    <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
  </div>
</section>
    </section>
  );
};

export default AboutBookCourier;