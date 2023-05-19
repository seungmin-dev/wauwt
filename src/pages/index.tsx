import Weather from "../components/weather";
import { useEffect, useState } from "react";
import { userIpApi } from "./api/weather";
import Board from "@/components/board";
import Layout from "@/components/layout";
import NewWauwt from "./newWauwt";
import { useRecoilState } from "recoil";
import { curLocation, newMemoState, userIp } from "@/util/atom";

const Home = () => {
  const [login, setLogin] = useState(true);
  const [newNote, setNewNote] = useRecoilState(newMemoState);
  const [location, setLocation] = useRecoilState(curLocation);
  const [ip, setIp] = useRecoilState(userIp);
  const getIp = async () => {
    const data = await userIpApi();
    // console.log(data);
    setLocation({
      lat: data.data.latitude,
      lon: data.data.longitude,
    });
    setIp(data.data.ip);
    console.log("index ip location");
  };

  useEffect(() => {
    getIp();
  }, []);

  return (
    <Layout>
      {newNote ? <NewWauwt /> : ""}
      <div className="flex justify-between items-center py-7 p-5 bg-white rounded-t-3xl">
        <Weather />
        {login ? (
          <button className="px-2 h-10 text-white bg-sky-700 rounded-md text-sm">
            로그인
          </button>
        ) : (
          <button
            onClick={() => setNewNote((prev) => !prev)}
            className="px-2 h-10 text-white bg-sky-700 rounded-md text-sm"
          >
            글쓰기
          </button>
        )}
      </div>
      <div className="p-6 w-full h-5/6 overflow-y-scroll">
        <Board />
      </div>
    </Layout>
  );
};

export default Home;
