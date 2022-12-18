import styled from "@emotion/styled";
import React from "react";
import Footer from "@/components/layout/Footer";
import Head from "@/components/layout/Head";
import Header from "@/components/layout/Header";

function PlayerLayout(props) {
  return (
    <Container>
      <Head></Head>
      <Header></Header>
      <ContentWrapper>
        <Content>{props.children}</Content>
      </ContentWrapper>
      <Footer></Footer>
    </Container>
  );
}

export default PlayerLayout;

const Container = styled.div`
  min-width: 360px;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  margin: 0px auto;
`;
const Content = styled.div`
  min-height: calc(100vh - 108px);
  margin: 0px auto;
  background-color: var(--sectionLine);
  & * {
    background-color: inherit;
  }
`;
