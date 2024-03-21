import Image from "next/image";
import { Button } from "../ui/button";

const HeroPage = () => {
  return (
    <div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex justify-center items-center pt-20 max-[810px]:flex-col px-2">
        <div className="text-center">
          <h1 className="text-5xl font-semibold">Battle Who Is Faster</h1>
        </div>
        <Image
          src="/hero.svg"
          alt="hero"
          width={500}
          height={500}
          className="animate-bounce max-[810px]:mt-5"
        />
      </div>
      <div className="flex justify-center mt-10">
        <Button className="font-semibold">Start Battling</Button>
      </div>
    </div>
  );
};

export default HeroPage;
