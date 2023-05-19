import { refresh } from "@/util/atom";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface Data {
  ip: string;
  randomNum: string;
  content: string;
  location: { lat: number; lon: number };
  reportedCount: number;
  createdAt: number;
  updatedAt: number;
}
interface Content extends Data {
  id: string;
}

const timeStampConvertor = (seconds: number) => {
  let convertedDate = new Date(seconds * 1000).toLocaleString();
  return convertedDate;
};

const Board = () => {
  const [contents, setContents] = useState<Content[]>();
  const [refreshing, setRefreshing] = useRecoilState(refresh);
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: "wauwt-e4b32.firebaseapp.com",
    projectId: "wauwt-e4b32",
    storageBucket: "wauwt-e4b32.appspot.com",
    messagingSenderId: "496565686145",
    appId: "1:496565686145:web:414ba150ef96da09632280",
    measurementId: "G-9E67M2FHPK",
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  //데이터 한번에 읽어오기
  const getData = async () => {
    const querySnapShot = await getDocs(collection(db, "wauwt"));
    querySnapShot.forEach((data) => console.log(data.data()));
    const data = querySnapShot.docs.reverse().map((doc) => ({
      id: doc.id,
      ...(doc.data() as Data),
    }));
    setContents(data);
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, [refreshing]);
  return (
    <div className="">
      {contents?.map((data: Content, index: number) => (
        <div key={index} className="w-full bg-white p-5 rounded-2xl mb-4">
          <h4 className="font-semibold text-lg pb-1">
            랜선친구 {data.randomNum}
          </h4>
          <p className="mb-1">{data.content}</p>
          <div className="flex justify-between">
            <p className="text-zinc-600">
              {timeStampConvertor(data.createdAt)}
            </p>
            <button className="p-1 px-2 text-white bg-red-600 rounded-md text-sm">
              신고
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
