"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function Donut() {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 1920,
      height: 1080,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
            
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  
  const chartRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (chartRef.current) {
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      const context = (
        chartRef.current as HTMLCanvasElement | null
      )?.getContext("2d");

      if (context) {
        const newChart = new Chart(context, {
          type: "doughnut",
          data: {
            labels: [
              "Kitchen Appliances",
              "Air Conditioning",
              "Refrigeration",
              "Lighting",
            ],
            datasets: [
              {
                label: "% of Energy Consumption in Restaurants",
                data: [28.3, 31.3, 25.3, 15.2],
                backgroundColor: [
                  "#B2B0EAff",
                  "#8481DDff",
                  "#5752D1ff",
                  "#3C3D99ff",
                ],
                borderColor: [
                  "#FFFFFFa0",
                  "#FFFFFFa0",
                  "#FFFFFFa0",
                  "#FFFFFFa0",
                ],
                borderWidth: 0,
                spacing: 3,
              },
            ],
          },
          options: {
            // responsive: true
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                //padding: 20,
              },
            },
          },
        });

        (chartRef.current as any).chart = newChart;
      }
    }
  }, []);
  return (
    <div className="w-1/2 rounded-md bg-gradient-to-r from-slate-800 via-white-100 to-black p-5 ">
      <div>
        <h4 className="font-playfair font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] mb-3">
          Device Consumption
        </h4>
      </div>
      <div
        style={{
          position: "relative",
          width: size.width <= 600 ? "80vw" : "40vw",
          height: size.width <= 600 ? "40vh" : "50vh",
        }}
        className="donut-container flex justify-start"
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
