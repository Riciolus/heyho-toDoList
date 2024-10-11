import Link from "next/link";

type PageType = "login" | "register";

type NavigationData = {
  name: string;
  href: string;
};

const NavigationBarHome = ({ toAuthPage }: { toAuthPage: PageType }) => {
  const navData: NavigationData[] = [
    { name: "Home", href: "/home" },
    { name: "Feature", href: "/home" },
    { name: "Overview", href: "/home" },
    {
      name: toAuthPage === "register" ? "Sign Up" : "Sign In",
      href: `/auth/${toAuthPage}`,
    },
  ];

  return (
    <nav className="relative top-5 flex justify-center items-center z-50">
      <div className="flex justify-center items-center  px-2 noPhone:px-0  font-semibold border border-neutral-600 bg-white/10 backdrop-blur rounded-full">
        {navData.map(({ name, href }) => {
          return (
            <Link href={href} key={name}>
              <button
                className={` hover:bg-white/80 hover:text-neutral-800 px-2 laptop:px-3.5 py-2.5 laptop:py-2 rounded-full transition duration-300 ${
                  name === "Sign Up"
                    ? "bg-white/90 text-neutral-800"
                    : name === "Sign In"
                    ? "bg-white/90 text-neutral-800"
                    : ""
                }`}
              >
                {name}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBarHome;
