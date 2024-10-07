type NavigationData = {
  name: string;
  href: string;
};

const navigationData: NavigationData[] = [
  { name: "Home", href: "/" },
  { name: "Feature", href: "/" },
  { name: "Overview", href: "/" },
  { name: "Log In", href: "/" },
  { name: "Sign In", href: "/" },
];

const NavigationBarHome = () => {
  return (
    <div className="relative top-3 flex justify-center items-center">
      <div className="flex justify-center items-center    font-semibold border border-neutral-600 bg-white/10 backdrop-blur rounded-full">
        {navigationData.map((data) => {
          return (
            <button
              key={data.name}
              className="hover:bg-white/90 hover:text-neutral-800 transition duration-300 px-3.5 laptop:py-2 py-3.5 rounded-full"
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBarHome;
