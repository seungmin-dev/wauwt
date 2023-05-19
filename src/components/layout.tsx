import Image from "next/image";
import { useRecoilState } from "recoil";
import { weatherBgState } from "@/util/atom";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [weatherBg, setWeatherBg] = useRecoilState(weatherBgState);
  return (
    <div className="w-full h-screen py-32">
      <div className="w-[28rem] h-[48rem] bg-white/60 m-auto rounded-3xl relative">
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
