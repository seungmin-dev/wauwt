import Image from "next/image";
import { useRecoilState } from "recoil";
import { weatherBgState } from "@/util/atom";
import { cls } from "@/util/utils";
import loadingGif from "../../public/images/loading-gif.gif";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [weatherBg, setWeatherBg] = useRecoilState(weatherBgState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (weatherBg !== "default") setLoading(false);
    else setLoading(true);
  }, [loading, weatherBg]);
  return (
    <div
      className={cls(
        weatherBg === "default" ? "" : "py-32",
        "w-full h-screen overflow-hidden"
      )}
    >
      {loading ? (
        <div className="w-full h-screen bg-blue-200 flex items-center flex-col justify-center">
          <h2 className="text-white text-2xl pb-10">
            날씨 정보를 로딩 중입니다
          </h2>
          <Image src={loadingGif} alt="" width={40} />
        </div>
      ) : (
        ""
      )}
      <div className="w-[28rem] h-[48rem] bg-white/60 m-auto rounded-3xl relative shadow-2xl">
        {children}
      </div>
      <div>
        <Image
          src={`/images/${weatherBg}.jpg`}
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
}
