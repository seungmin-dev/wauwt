import { curLocation, newMemoState, userIp } from "@/util/atom";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

const NewWauwt = () => {
  const [newNote, setNewNote] = useRecoilState(newMemoState);
  const [location, setLocation] = useRecoilState(curLocation);
  const [ip, setIp] = useRecoilState(userIp);
  const [done, setDone] = useState(false);
  const content = useRef<HTMLTextAreaElement | null>(null);
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

  const newWauwt = async () => {
    const docRef = await addDoc(collection(db, "wauwt"), {
      content: content.current?.value,
      id: "asdgasdg",
      ip,
      location: {
        lat: location.lat,
        lon: location.lon,
      },
      randomNum: Math.floor(Math.random() * 100).toString(),
      reportedCount: 0,
      createdAt: Math.floor(new Date().getTime() / 1000),
      updatedAt: Math.floor(new Date().getTime() / 1000),
    });
    // console.log("new wauwt : ", docRef);
    setDone(true);
  };

  const memoDone = () => {
    setDone(false);
    setNewNote(false);
  };
  return (
    <div className="absolute w-full h-full bg-black/60 rounded-3xl pt-40">
      <div className="w-11/12 h-1/2 bg-white rounded-xl p-6 m-auto relative">
        {done ? (
          <div className="w-full h-full rounded-xl m-auto absolute left-0 top-0 bg-yellow-100">
            <h2 className="text-center font-semibold text-lg pt-24 pb-10">
              당신은 오늘도
              <br />한 사람의 하루를
              <br />
              구했습니다💝
            </h2>
            <div className="w-100 h-10 text-center">
              <button
                onClick={memoDone}
                className="px-2 h-10 text-white bg-yellow-600 rounded-md text-sm m-auto"
              >
                고마워요
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl py-6">오늘 내 옷차림은 ~</h2>
          <div>
            <button
              onClick={() => setNewNote((prev) => !prev)}
              className="px-2 h-10 text-white bg-gray-600 rounded-md text-sm mr-1"
            >
              그만두기
            </button>
            <button
              onClick={newWauwt}
              className="px-2 h-10 text-white bg-blue-600 rounded-md text-sm"
            >
              알려주기
            </button>
          </div>
        </div>
        <textarea
          ref={content}
          className="w-full h-3/5 p-4 border-gray-200 border-[1px] rounded-xl"
        />
      </div>
    </div>
  );
};

export default NewWauwt;
