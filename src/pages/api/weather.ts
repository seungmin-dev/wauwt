import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const weatherApi = (lat: Number, lon: Number) =>
  api.get(
    `weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=kr`
  );
export const userIpApi = () =>
  axios.get(
    `https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IP_API_KEY}`
  );

export const getAccessToken = () =>
  axios.get(
    `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${process.env.NEXT_PUBLIC_SGIS_API_ID}&consumer_secret=${process.env.NEXT_PUBLIC_SGIS_API_KEY}`
  );

export const getChangeCoords = (
  accessToken: string,
  posX: Number,
  posY: Number
) =>
  axios.get(
    `https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json?accessToken=${accessToken}&src=4326&dst=5179&posX=${posY}&posY=${posX}`
  );

export const getReverseGeo = (
  accessToken: string,
  x_coor: Number,
  y_coor: Number
) =>
  axios.get(
    `https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json?accessToken=${accessToken}&x_coor=${x_coor}&y_coor=${y_coor}&addr_type=20`
  );
