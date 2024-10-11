"use client";

import NavigationBarHome from "../components/home/navbar";
import Hero from "../components/home/hero";
import { motion } from "framer-motion";
import Features from "../components/home/features";
import ProductShowcase from "../components/home/productShowcase";
import Footer from "../components/home/footer";

const HomePage = () => {
  return (
    <div className="bg-neutral-900 overflow-x-clip w-[100%]">
      <NavigationBarHome toAuthPage="register" />
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <Hero />
        <Features />
        <ProductShowcase />
        <Footer />
      </motion.div>
    </div>
  );
};

export default HomePage;
