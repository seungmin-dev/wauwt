import Image from "next/image";
import bgImage from "../assets/01d.jpg";
import Weather from "../../components/weather";
import { useEffect } from "react";
import { userIpApi } from "./api/weather";
import Board from "../../components/board";

const Home = () => {
  const ip = async () => {
    const data = await userIpApi();
  };

  useEffect(() => {
    ip();
  }, []);

  return (
    <div className="w-full h-screen py-32">
      <div className="w-[28rem] h-[48rem] bg-white/60 m-auto rounded-3xl p-6 ">
        <div className="flex justify-between py-7 mb-3 p-5">
          {/* <Weather /> */}
          <button className="px-2 text-white bg-sky-700 rounded-md text-sm">
            로그인
          </button>
        </div>
        <Board />
      </div>
      <div>
        <Image
          src={bgImage}
          alt="배경이미지"
          fill
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -100,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
