import Image from "next/image";
import appScreenDesktop from "../../../public/assets/images/app-screen-desktop.png";
import appScreenMobile from "../../../public/assets/images/app-screen-mobile.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ProductShowcase = () => {
  const appImage = useRef(null);

  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div className="flex justify-center bg-neutral-900 text-neutral-50 bg-gradient-to-b from-neutral-900 via-[#5D2CA8] via-90% to-neutral-900  py-[68px]">
      <div className="mx-3 container relative">
        <h2 className="text-center text-4xl laptop:text-5xl font-semibold tracking-tighter">
          Intuitive Interface
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-lg text-center text-neutral-400 mt-5 max-w-xl">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes,
            one task at a time.
          </p>
        </div>
        <div>
          <motion.div
            style={{
              opacity: opacity,
              rotateX: rotateX,
              transformPerspective: "800px",
            }}
            className="flex  flex-col tablet:flex-row tablet:ml-11 gap-8 tablet:gap-4 justify-center mt-14"
            ref={appImage}
          >
            <div className="flex justify-center">
              <Image
                src={appScreenMobile}
                alt="Product Showcase - Mobile"
                className="h-[318px] noPhone:h-auto laptop:h-[480px] w-auto"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src={appScreenDesktop}
                alt="Product Showcase - Desktop"
                className="h-auto  laptop:w-auto laptop:h-[480px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
