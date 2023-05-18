import { weatherApi } from "@/pages/api/weather";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Coords {
  lat: Number;
  lon: Number;
}
interface WeatherObj {
  [key: string]: any;
}
const Weather = () => {
  const [coords, setCoords] = useState<Coords>();
  const [coordsInit, setCoordsInit] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherObj>();

  const getWeather = async () => {
    const { data }: WeatherObj = await weatherApi(coords!.lat, coords!.lon);
    setWeatherData(data);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setCoordsInit(true);
      }
    });
  }, []);
  useEffect(() => {
    if (coordsInit) {
      getWeather();
    }
  }, [coordsInit]);

  return (
    <div style={{ flexGrow: 1, paddingRight: "10px" }}>
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
      {/* <Image
        src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
        alt=""
        width={50}
        height={50}
      /> */}
    </div>
  );
};
export default Weather;
