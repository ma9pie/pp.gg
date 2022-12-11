import styled from "@emotion/styled";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Wrapper {...props}>
      <Doughnut data={data}></Doughnut>
    </Wrapper>
  );
}

export default DoughnutChart;

DoughnutChart.defaultProps = {
  width: "200px",
  height: "200px",
  margin: "0px",
  padding: "0px",
  labels: ["label1", "label2"],
  data: [1, 1],
  backgroundColor: ["#5383e8", "#e84057"],
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
