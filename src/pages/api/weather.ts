import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const weatherApi = (lat: Number, lon: Number) =>
  api.get(
    `weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=kr`
  );
export const userIpApi = () =>
  api.get(
    `https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IP_API_KEY}`
  );
