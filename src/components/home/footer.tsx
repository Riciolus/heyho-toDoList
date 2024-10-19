import Image from "next/image";
import InstaIcon from "../../../public/assets/icons/insta.svg";
import XSocial from "../../../public/assets/icons/x-social.svg";
import GithubIcon from "../../../public/assets/icons/github.svg";

const Footer = () => {
  return (
    <footer className="py-3 bg-neutral-900 text-neutral-400 border-t border-neutral-800">
      <div className="px-5 w-full">
        {" "}
        <div className="flex flex-col gap-2 noPhone:flex-row noPhone:justify-between">
          <div className="text-center">
            © 2024 Riciolus, Inc. All rights reserved
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <a href="https://www.instagram.com/riciolus">
                <Image src={InstaIcon} alt="Insta Icon" />
              </a>
            </li>
            <li>
              <a href="https://x.com/elonmusk">
                <Image src={XSocial} alt="X Icon" />
              </a>
            </li>
            <li>
              <a href="https://github.com/Riciolus">
                <Image
                  src={GithubIcon}
                  alt="Github Icon"
                  className="w-[24px] h-[24px]"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
