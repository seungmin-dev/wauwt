import Weather from "../components/weather";
import { Suspense, useEffect, useState } from "react";
import { userIpApi } from "./api/weather";
import Board from "@/components/board";
import Layout from "@/components/layout";
import NewWauwt from "./newWauwt";
import { useRecoilState } from "recoil";
import { curLocation, loginState, newMemoState, user } from "@/util/atom";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth, db } from "@/util/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";

const Home = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const [newNote, setNewNote] = useRecoilState(newMemoState);
  const [location, setLocation] = useRecoilState(curLocation);
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const getIp = async () => {
    const data = await userIpApi();
    setUserInfo({ uid: "", ip: data.data.ip });
  };

  const getLogin = () => {
    signInAnonymously(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserInfo({ uid: user.uid, ip: userInfo.ip });
            setLoggedIn(true);
            setLoginSuccess(true);
          } else {
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("익명로그인 오류 : ", errorMessage);
      });
  };

  const deleteOver3days = async () => {
    const over3days = query(
      collection(db, "wauwt"),
      where("createdAt", "<=", Number(new Date()) / 1000 - 259200)
    );
    let querySnapShot = await getDocs(over3days);
    let idArr: string[] = [];
    querySnapShot.forEach((doc) => {
      idArr.push(doc.id);
    });
    for (let i = 0; i < idArr.length; i++) {
      await deleteDoc(doc(db, "wauwt", idArr[i]));
    }
  };

  useEffect(() => {
    deleteOver3days();
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    getIp();
  }, []);

  return (
    <Layout>
      {newNote ? <NewWauwt /> : ""}
      <div className="flex justify-between items-center py-7 p-5 bg-white rounded-t-3xl">
        {loginSuccess ? (
          <div className="w-full h-full bg-black/50 absolute left-0 top-0 rounded-3xl pt-40">
            <div className="w-1/2 text-center bg-white p-8 rounded-2xl m-auto">
              <h2 className="text-center font-semibold text-lg pb-4">
                익명로그인 성공!
              </h2>
              <button
                onClick={() => setLoginSuccess(false)}
                className="px-5 h-10 text-white bg-pink-100 rounded-md text-sm"
              >
                💖
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <Weather />
        {loggedIn ? (
          <button
            onClick={() => setNewNote((prev) => !prev)}
            className="px-2 h-10 text-white bg-blue-600 rounded-md text-sm ml-3"
          >
            글쓰기
          </button>
        ) : (
          <button
            onClick={getLogin}
            className="px-2 h-10 text-white bg-sky-700 rounded-md text-sm ml-3"
          >
            익명로그인
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
