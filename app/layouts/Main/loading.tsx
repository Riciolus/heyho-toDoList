import LoadingCard from "@/app/components/loadingCard";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-between animate-pulse w-full h-full">
      <div>
        <h1 className="bg-lazyload w-[20%] h-11 rounded-lg mb-6"></h1>
        <div className="flex h-[34rem] flex-col gap-1.5 w-[98%]">
          <LoadingCard />
        </div>
      </div>
      <div className="bg-lazyload rounded-lg w-full h-16"></div>
    </div>
  );
};

export default LoadingPage;
