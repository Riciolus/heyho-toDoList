const LoadingCard = () => {
  return (
    <>
      {Array.from(Array(5).keys()).map((i) => (
        <div
          key={i}
          className="bg-lazyload py-3 mx-0.5 rounded-lg text-transparent animate- animate-pulse"
        >
          a
        </div>
      ))}
    </>
  );
};

export default LoadingCard;
