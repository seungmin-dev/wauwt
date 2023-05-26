import { curLocation, weatherBgState } from "@/util/atom";
import {
  getAccessToken,
  getChangeCoords,
  getReverseGeo,
  weatherApi,
} from "@/pages/api/weather";
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
  const [addr, setAddr] = useState("");

  const getWeather = async () => {
    const { data }: WeatherObj = await weatherApi(location.lat, location.lon);
    setWeatherBg(data?.weather[0].icon);
    setWeatherData(data);
  };
  const getCoords = async () => {
    const { data: tokenData } = await getAccessToken();
    const { data: coordsData } = await getChangeCoords(
      tokenData.result.accessToken,
      location.lat,
      location.lon
    );
    const { data: rgeoData } = await getReverseGeo(
      tokenData.result.accessToken,
      coordsData.result.posX,
      coordsData.result.posY
    );
    setAddr(rgeoData.result[0].full_addr);
  };
  useEffect(() => {
    if (location.lat !== 0 && location.lon !== 0) {
      getWeather();
      getCoords();
    }
  }, [location]);

  return (
    <div className="flex-grow pr-5">
      <div className="flex mb-1">
        {addr ? (
          <>
            <p className="pr-2 font-semibold">현재 위치</p>
            <p>{addr}</p>
          </>
        ) : (
          <p>위치 정보 로딩 중...</p>
        )}
      </div>
      {weatherData ? (
        <>
          <div className="flex justify-between">
            <div className="flex">
              <p className="font-semibold mr-2">날씨</p>
              <p>{weatherData?.weather[0].description}</p>
            </div>
            <div className="flex">
              <p className="font-semibold mr-2">기온</p>
              <p>{weatherData?.main.temp}℃</p>
            </div>
            <div className="flex">
              <p className="font-semibold mr-2">체감</p>
              <p>{weatherData?.main.feels_like}℃</p>
            </div>
          </div>
        </>
      ) : (
        <p>날씨 정보 로딩 중...</p>
      )}
    </div>
  );
};
export default Weather;
