import styled from "@emotion/styled";
import React from "react";

function ProcessDot({ process }) {
  return (
    <Wrapper>
      <CircleContainer>
        {[...new Array(5)].map((item, key) => (
          <Circle
            key={key}
            bg={process === key ? "var(--brandColor)" : "var(--textBox)"}
          ></Circle>
        ))}
      </CircleContainer>
    </Wrapper>
  );
}

export default ProcessDot;
const Wrapper = styled.div``;
const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 32px 0px 64px 0px;
`;
const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.bg};
  border-radius: 50%;
`;
