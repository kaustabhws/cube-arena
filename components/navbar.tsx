import Image from "next/image";
import { MainNav } from "./main-nav";
import HamburgerMenu from "./hamburger";
import LoginButton from "./wca-login";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-4 max-[344px]:px-2">
        <div className='sm:hidden'>
          <HamburgerMenu />
        </div>
        <div>
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="w-24 h-24"
          />
        </div>
        <MainNav className='hidden sm:block' />
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
