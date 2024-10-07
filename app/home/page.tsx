"use client";

import { motion } from "framer-motion";
import NavigationBarHome from "./navbar";

const HomePage = () => {
  return (
    // <div className="min-h-screen">
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <NavigationBarHome />
      <div className="relative flex flex-col justify-center items-center text-center p-3 laptop:mt-48 mt-8">
        <h1 className="text-4xl laptop:text-5xl   font-semibold mb-1">
          Create. Organize. Achieve.
        </h1>
        <div className="p-2 border rounded-2xl border-neutral-700 bg-neutral-950 bg-opacity-40 m-3">
          <h3 className="text-lg laptop:text-2xl font-medium font-mono">
            Your tasks, simplified. Get things done effortlessly
          </h3>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nam
          natus iste porro, placeat itaque illo! Ipsum error modi, consequatur
          facilis tempora vero nobis, rerum expedita deleniti molestias
          voluptatem sit!
        </p>
      </div>
    </motion.div>
    // </div>
  );
};

export default HomePage;
