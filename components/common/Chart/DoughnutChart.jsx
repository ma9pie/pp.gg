import styled from "@emotion/styled";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart(props) {
  const data = {
    labels: ["승리", "패배"],
    datasets: [
      {
        // label: "# of Votes",
        data: [12, 19],
        backgroundColor: ["#5383e8", "#e84057"],
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
  width: "100%",
  height: "100%",
  margin: "0px",
  padding: "0px",
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
