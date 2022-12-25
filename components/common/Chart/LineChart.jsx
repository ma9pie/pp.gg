import styled from "@emotion/styled";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "rate",
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderWidth: 1,
        borderColor: "#5383e8",
      },
    ],
  };

  return (
    <Wrapper {...props}>
      <Line data={data}></Line>
    </Wrapper>
  );
}

export default LineChart;

LineChart.defaultProps = {
  width: "auto",
  height: "auto",
  margin: "0px",
  padding: "0px",
  labels: ["label1", "label2"],
  data: [1, 1],
  backgroundColor: ["#5383e8"],
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
