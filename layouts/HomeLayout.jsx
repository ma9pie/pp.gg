import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Head from "@/components/layout/Head";
import Header from "@/components/layout/Header";

function HomeLayout(props) {
  return (
    <Container>
      <Head></Head>
      <Header borderBottom="2px solid var(--blue600)"></Header>
      <BodyContent>{props.children}</BodyContent>
      <Footer></Footer>
    </Container>
  );
}

export default HomeLayout;

const Container = styled.div`
  min-width: 280px;
  height: 100vh;
`;
const BodyContent = styled.div`
  min-height: calc(100% - 108px);
  background-color: var(--homeBg);
`;
