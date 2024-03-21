"use client";

import ScramblePage from "@/components/scramble/scramble-gen";
import { db } from "@/utils/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const RoomPage = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<any>(null);

  const getData = async () => {
    const data = onSnapshot(doc(db, "rooms", params.slug), (doc) => {
      setData(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-between">
        {/* Timer content */}
        {/* <div className="min-h-screen w-[20%] border-r border-muted px-2 py-2">
          <div className="flex justify-center flex-col">
            <div>
              <h1 className="text-center font-semibold text-xl">
                {data?.name}'s Room
              </h1>
              <Separator className="mt-2" />
            </div>
            <div className="mt-3 flex flex-col">
              <h1 className="text-muted-foreground">Room ID: {params.slug}</h1>
              <div className="mt-10">
                <h1 className="text-muted-foreground">Participants: </h1>
                <ul className="ml-5">
                  {data?.participants?.map((participant: string) => (
                    <li className="list-decimal" key={participant}>
                      {participant}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        {data?.event && <ScramblePage event={data?.event} />}

        {/* Room details */}
        {/* <div className="min-h-screen w-[20%] border-l border-muted px-2 py-2">
          <div className="flex justify-center flex-col">
            <div>
              <h1 className="text-center font-semibold text-xl">
                {data?.name}'s Room
              </h1>
              <Separator className="mt-2" />
            </div>
            <div className="mt-3 flex flex-col">
              <h1 className="text-muted-foreground">Room ID: {params.slug}</h1>
              <div className="mt-10">
                <h1 className="text-muted-foreground">Participants: </h1>
                <ul className="ml-5">
                  {data?.participants?.map((participant: string) => (
                    <li className="list-decimal" key={participant}>
                      {participant}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RoomPage;
