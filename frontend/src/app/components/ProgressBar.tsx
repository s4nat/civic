"use client";
import React from "react";
import * as Progress from "@radix-ui/react-progress";

interface ProgressDemoProps {
  fundAmount: number;
  targetAmount: number;
}

export default function ProgressDemo(props: ProgressDemoProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const currProg = (props.fundAmount / props.targetAmount)*100;
    const timer = setTimeout(() => setProgress(currProg), 500);
    return () => clearTimeout(timer);
  }, [props.fundAmount, props.targetAmount]);

  return (
    <Progress.Root
      className="relative overflow-hidden bg-[#7C0000]/20 rounded-full w-full h-[10px]"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-[#7C0000] w-full h-full rounded-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}
