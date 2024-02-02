import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ChartData, ChartOptions } from "chart.js/auto";
import "./LineChart.css";

interface LineChartProps {
  data: ChartData;
  options?: ChartOptions;
  width?: number; // Nova propriedade para a largura do gráfico
  height?: number; // Nova propriedade para a altura do gráfico
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  options,
  width,
  height,
}) => {
  const chartContainerRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chartContainerRef.current.width = width || 400;
      chartContainerRef.current.height = height || 300;

      chartInstanceRef.current = new ChartJS(chartContainerRef.current, {
        type: "line",
        data,
        options,
      });
    }

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data, options, width, height]);

  return (
    <div>
      <canvas ref={chartContainerRef} />
    </div>
  );
};

export default LineChart;
