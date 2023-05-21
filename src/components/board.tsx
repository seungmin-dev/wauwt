import { curLocation, refresh, user } from "@/util/atom";
import { db } from "@/util/firebase";
import { cls } from "@/util/utils";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  query,
  where,
  orderBy,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface Data {
  uid: string;
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
  let time = new Date(seconds * 1000).toLocaleString();
  let convertedDate = time.slice(0, time.length - 3);
  return convertedDate;
};

const Board = () => {
  const [contents, setContents] = useState<Content[]>();
  const [refreshing, setRefreshing] = useRecoilState(refresh);
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [location, setLocation] = useRecoilState(curLocation);

  //데이터 한번에 읽어오기
  const getData = async () => {
    // 3일 이내 조회
    const q1 = query(
      collection(db, "wauwt"),
      where("createdAt", ">=", Number(new Date()) / 1000 - 259200),
      orderBy("createdAt", "desc")
    );
    // const q2 = query(
    //   collection(db, "wauwt"),
    //   where("location.lat", ">=", Math.abs(location.lat - 0.011)),
    //   where("location.lat", "<=", Math.abs(location.lat + 0.011))
    // );
    // const q3 = query(
    //   collection(db, "wauwt"),
    //   where("location.lon", ">=", Math.abs(location.lon - 0.011)),
    //   where("location.lon", "<=", Math.abs(location.lon + 0.011))
    // );

    let querySnapShot = await getDocs(q1);
    const data = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Data),
    }));
    setContents(data);
    setRefreshing(false);
  };

  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, "wauwt", id));
    setRefreshing(true);
  };

  const onReport = async (id: string) => {
    const reportedDoc = doc(db, "wauwt", id);
    await updateDoc(reportedDoc, {
      reportedCount: increment(1),
    });
    setRefreshing(true);
  };

  useEffect(() => {
    getData();
  }, [refreshing]);
  return (
    <div>
      {contents?.map((data: Content, index: number) => (
        <div
          key={index}
          className={cls(
            "w-full p-5 rounded-2xl mb-4",
            data.uid === userInfo.uid ? "bg-blue-100" : "bg-white"
          )}
        >
          {Math.abs(data.location.lat - location.lat) <= 0.001 &&
          Math.abs(data.location.lon - location.lon) <= 0.011 ? (
            <>
              {data.reportedCount >= 3 ? (
                <h2>신고가 3회 이상 접수되어 가려진 글입니다.</h2>
              ) : (
                <>
                  <h4 className="font-semibold text-lg pb-1">
                    랜선친구 {data.randomNum}
                  </h4>
                  <p className="mb-1">{data.content}</p>
                  <div className="flex justify-between">
                    <p className="text-zinc-600 text-sm">
                      {timeStampConvertor(data.createdAt)}
                    </p>
                    {data.uid === userInfo.uid ? (
                      <button
                        onClick={() => onDelete(data.id)}
                        className="p-1 px-2 text-white bg-red-600 rounded-md text-sm"
                      >
                        삭제
                      </button>
                    ) : (
                      <button
                        onClick={() => onReport(data.id)}
                        className="p-1 px-2 text-white bg-red-600 rounded-md text-sm"
                      >
                        신고
                      </button>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            "현재 위치에서는 볼 수 없는 글입니다."
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
