import styled from "@emotion/styled";
import React from "react";

function Footer(props) {
  return (
    <Wrapper {...props}>
      <Copyright {...props}>
        Copyright 2022 ma9pie All rights reserved
      </Copyright>
    </Wrapper>
  );
}

export default Footer;

Footer.defaultProps = {
  color: "var(--main)",
  borderTop: "2px solid var(--sectionLine)",
  backgroundColor: "var(--textBox)",
};

const Wrapper = styled.footer`
  position: relative;
  height: 48px;
  padding: 16px;
  border-top: ${(props) => props.borderTop};
  background-color: ${(props) => props.backgroundColor};
  & * {
    background-color: inherit;
  }
`;
const Copyright = styled.p`
  text-align: right;
  color: ${(props) => props.color};
`;
