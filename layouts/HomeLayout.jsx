import { themeState } from "@/recoil/atom";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Footer from "@/components/layout/Footer";
import Head from "@/components/layout/Head";
import Header from "@/components/layout/Header";

function HomeLayout(props) {
  const [theme, setTheme] = useRecoilState(themeState);

  const getBackgroundColor = () => {
    return theme === "Dark" ? "var(--bg)" : "var(--brandColor)";
  };

  const getBorderTop = () => {
    return theme === "Dark"
      ? "2px solid var(--sectionLine)"
      : "2px solid var(--blue600)";
  };

  return (
    <Container>
      <Head></Head>
      <Header borderBottom="2px solid var(--blue600)"></Header>
      <BodyContent backgroundColor={getBackgroundColor()}>
        {props.children}
      </BodyContent>
      <Footer
        color="white"
        borderTop={getBorderTop()}
        backgroundColor={getBackgroundColor()}
      ></Footer>
    </Container>
  );
}

export default HomeLayout;

const Container = styled.div`
  min-width: 1080px;
  height: 100vh;
`;
const BodyContent = styled.div`
  min-height: calc(100% - 108px);
  background-color: ${(props) => props.backgroundColor};
`;
