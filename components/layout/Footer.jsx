import styled from "@emotion/styled";
import React from "react";

function Footer(props) {
  return (
    <Wrapper>
      <Copyright>Copyright 2022 ma9pie All rights reserved</Copyright>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.footer`
  position: relative;
  height: 48px;
  padding: 16px;
  border-top: 2px solid var(--footerSectionLine);
  background-color: var(--footerBg);
  & * {
    background-color: inherit;
  }
`;
const Copyright = styled.p`
  text-align: right;
  color: white;
`;
