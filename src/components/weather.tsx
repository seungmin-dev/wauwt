import { curLocation, weatherBgState } from "@/util/atom";
import { weatherApi } from "@/pages/api/weather";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface Coords {
  lat: Number;
  lon: Number;
}
interface WeatherObj {
  [key: string]: any;
}
const Weather = () => {
  const [location, setLocation] = useRecoilState(curLocation);
  const [weatherData, setWeatherData] = useState<WeatherObj>();
  const [weatherBg, setWeatherBg] = useRecoilState(weatherBgState);

  const getWeather = async () => {
    const { data }: WeatherObj = await weatherApi(location.lat, location.lon);
    setWeatherBg(data?.weather[0].icon);
    setWeatherData(data);
  };
  useEffect(() => {
    if (location.lat !== 0 && location.lon !== 0) getWeather();
  }, [location]);

  return (
    <div style={{ flexGrow: 1, paddingRight: "10px" }}>
      {weatherData ? (
        <>
          <div className="flex">
            <p className="pr-2">현재 위치</p>
            <p>{weatherData?.name}</p>
          </div>
          <div className="flex justify-between">
            <p>날씨</p>
            <p>{weatherData?.weather[0].description}</p>
            <p>기온</p>
            <p>{weatherData?.main.temp}℃</p>
            <p>체감</p>
            <p>{weatherData?.main.feels_like}℃</p>
          </div>
        </>
      ) : (
        <p>날씨 정보 로딩 중...</p>
      )}
    </div>
  );
};
export default Weather;
