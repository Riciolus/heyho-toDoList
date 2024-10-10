import Image from "next/image";
import appScreenDesktop from "../../../public/assets/images/app-screen-desktop.png";
import appScreenMobile from "../../../public/assets/images/app-screen-mobile.png";

const ProductShowcase = () => {
  return (
    <div className="flex justify-center bg-neutral-900 text-neutral-50 bg-gradient-to-b from-neutral-900 to-[#5D2CA8] py-[68px]">
      <div className="mx-3 container">
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
        <div className="flex  flex-col tablet:flex-row tablet:ml-11 gap-8 tablet:gap-4 justify-center mt-14">
          <div className="flex justify-center">
            <Image
              src={appScreenMobile}
              alt="Product Showcase - Mobile"
              className="h-[318px] laptop:h-[480px] w-auto"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={appScreenDesktop}
              alt="Product Showcase - Desktop"
              className="h-auto laptop:w-auto laptop:h-[480px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
