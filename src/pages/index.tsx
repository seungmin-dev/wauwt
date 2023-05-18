import Image from "next/image";
import bgImage from "../assets/01d.jpg";
import Weather from "../../components/weather";
// import SearchVillage from "../../components/searchVillage";
import { SetStateAction, Suspense, useEffect, useState } from "react";
import { userIpApi } from "./api/weather";
import SearchVillage from "../../components/searchVillage";

const Home = () => {
  const [init, setInit] = useState(false);
  const [region, setRegion] = useState("");

  const ip = async () => {
    const data = await userIpApi();
    console.log(data);
  };

  useEffect(() => {
    // ip();
  }, []);

  return (
    <div className="w-full h-screen py-32">
      <div className="w-[28rem] h-[48rem] bg-white/60 m-auto rounded-3xl p-6 ">
        <div className="flex justify-between py-7 mb-3 p-5">
          <Weather />
          <button className="px-2 text-white bg-sky-700 rounded-md text-sm">
            로그인
          </button>
        </div>

        <div>
          <div className="bg-white p-5 rounded-2xl mb-4">
            <h4 className="font-semibold text-lg pb-1">랜선친구 79</h4>
            <p className="mb-1">
              난 오늘 이렇게 입었어! 오늘은 기온이 좀 낮네. 오후에 비온다니까
              다들 우산 챙기고.
            </p>
            <div className="flex justify-between">
              <p className="text-zinc-600">2023.05.18.목 02:27 PM</p>
              <button className="p-1 px-2 text-white bg-red-600 rounded-md text-sm">
                신고
              </button>
              {/* <button>수정</button>
              <button>삭제</button> */}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl mb-4">
            <h4 className="font-semibold text-lg pb-1">나</h4>
            <p className="mb-1">비온다!!!!</p>
            <div className="flex justify-between">
              <p className="text-zinc-600">2023.05.18.목 02:32 PM</p>
              <div>
                <button className="p-1 px-2 text-white bg-blue-400 rounded-md mr-1 text-sm">
                  수정
                </button>
                <button className="p-1 px-2 text-white bg-red-400 rounded-md text-sm">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
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
