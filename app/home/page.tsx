"use client";

import NavigationBarHome from "../components/home/navbar";
import Hero from "../components/home/hero";
import { motion } from "framer-motion";
import Features from "../components/home/features";
import ProductShowcase from "../components/home/productShowcase";

const HomePage = () => {
  return (
    <div className="bg-neutral-900 overflow-x-clip">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <NavigationBarHome />
        <Hero />
        <Features />
        <ProductShowcase />
      </motion.div>
    </div>
  );
};

export default HomePage;
