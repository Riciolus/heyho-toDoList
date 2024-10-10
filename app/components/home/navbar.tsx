type NavigationData = {
  name: string;
  href: string;
};

const navigationData: NavigationData[] = [
  { name: "Home", href: "/" },
  { name: "Feature", href: "/" },
  { name: "Overview", href: "/" },
  { name: "Log In", href: "/" },
];

const NavigationBarHome = () => {
  return (
    <nav className="relative top-5 flex justify-center items-center">
      <div className="flex justify-center items-center  px-2  font-semibold border border-neutral-600 bg-white/10 backdrop-blur rounded-full">
        {navigationData.map((data) => {
          return (
            <button
              key={data.name}
              className="hover:bg-white/80 hover:text-neutral-800 transition duration-300 px-2 laptop:px-3.5 py-2.5 laptop:py-2 rounded-full"
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBarHome;
