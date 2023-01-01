import styled from "@emotion/styled";
import React from "react";

function ProcessDot({ process, length }) {
  return (
    <Wrapper>
      <CircleContainer>
        {[...new Array(length)].map((item, key) => (
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

ProcessDot.defaultProps = {
  process: 0,
  length: 4,
};

const Wrapper = styled.div``;
const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 32px 0px;
`;
const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.bg};
  border-radius: 50%;
`;
