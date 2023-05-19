import { refresh, user } from "@/util/atom";
import { db } from "@/util/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
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
  let convertedDate = new Date(seconds * 1000).toLocaleString();
  return convertedDate;
};

const Board = () => {
  const [contents, setContents] = useState<Content[]>();
  const [refreshing, setRefreshing] = useRecoilState(refresh);
  const [userInfo, setUserInfo] = useRecoilState(user);

  //데이터 한번에 읽어오기
  const getData = async () => {
    const querySnapShot = await getDocs(collection(db, "wauwt"));
    // querySnapShot.forEach((data) => console.log(data.data()));
    const data = querySnapShot.docs.reverse().map((doc) => ({
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

  useEffect(() => {
    getData();
  }, [refreshing]);
  return (
    <div>
      {contents?.map((data: Content, index: number) => (
        <div key={index} className="w-full bg-white p-5 rounded-2xl mb-4">
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
              <button className="p-1 px-2 text-white bg-red-600 rounded-md text-sm">
                신고
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
