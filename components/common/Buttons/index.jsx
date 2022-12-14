import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";
import Ripple from "@/components/common/Ripple";

const Buttons = (props) => {
  return (
    <Wrapper width={props.width} borderRadius={props.borderRadius}>
      <ButtonWrapper>
        {(() => {
          if (props.disabled) {
            return (
              <Button
                {...props}
                backgroundColor="var(--disabled)"
                cursor="auto"
              >
                <Children>{props.children}</Children>
              </Button>
            );
          } else if (props.type === "sub") {
            return (
              <Ripple type={props.type}>
                <Button
                  {...props}
                  color="var(--main)"
                  backgroundColor="var(--textBox)"
                  border="1px solid var(--sectionLine)"
                >
                  <Children>{props.children}</Children>
                </Button>
              </Ripple>
            );
          } else {
            return (
              <Ripple type={props.type}>
                <Button {...props}>
                  <Children>{props.children}</Children>
                </Button>
              </Ripple>
            );
          }
        })()}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Buttons;

Buttons.defaultProps = {
  font: "var(--body16)",
  width: "100%",
  height: "56px",
  margin: "0px",
  padding: "0px",
  border: "0px",
  borderRadius: "5px",
  color: "white",
  backgroundColor: "var(--blue600)",
  cursor: "pointer",
  disabled: false,
  onClick: () => {},
};

const Wrapper = styled.div`
  overflow: hidden;
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
`;
const ButtonWrapper = styled.span`
  position: relative;
`;
const Button = styled.button`
  font: ${(props) => props.font};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.fontHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor} !important;
  cursor: ${(props) => props.cursor};
  text-align: center;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
  }
`;
const Children = styled.div`
  background-color: transparent;
  & * {
    background-color: inherit;
  }
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: inherit;
`;
