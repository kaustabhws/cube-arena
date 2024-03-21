"use client";

import React, { useEffect, useState } from "react";
import {
  DisplayCube,
  generateScramble,
  applyScramble,
  Cube,
} from "react-rubiks-cube-utils";
import { Button } from "../ui/button";
import Stopwatch from "../stopwatch";
import toast from "react-hot-toast";

interface ScramblePageProps {
  event: string;
}

const ScramblePage: React.FC<ScramblePageProps> = ({ event }) => {
  const [myScramble, setMyScramble] = useState("");
  const [myCube, setMyCube] = useState<Cube>();

  const generateAndApplyScramble = () => {
    const scramble = generateScramble({ type: event });
    setMyScramble(scramble);

    if (["2x2", "3x3", "4x4", "5x5", "6x6", "7x7"].includes(event)) {
      const cube: Cube = applyScramble({ type: event, scramble });
      setMyCube(cube);
    }

    toast.success("New scramble generated!");
  };

  const handleGenerateNewClick = () => {
    generateAndApplyScramble();
  };

  useEffect(() => {
    generateAndApplyScramble();
  }, []);

  return (
    <div className="bg-[#09090b] w-full">
      <div className="flex justify-center mt-4 flex-col items-center">
        <p className="text-white text-center">{myScramble}</p>
        <Button
          variant="ghost"
          onClick={handleGenerateNewClick}
          className="w-max px-2 py-1"
        >
          Next
        </Button>
      </div>
      <div className="flex justify-between items-center flex-col gap-28">
        <Stopwatch generateAndApplyScramble={generateAndApplyScramble} />
        <div className="">
          {myCube && <DisplayCube cube={myCube} size={10} />}
        </div>
      </div>
    </div>
  );
};

export default ScramblePage;
