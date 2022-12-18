import styled from "@emotion/styled";
import React from "react";
import Footer from "@/components/layout/Footer";
import Head from "@/components/layout/Head";
import Header from "@/components/layout/Header";

function CommonLayout(props) {
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

export default CommonLayout;

const Container = styled.div`
  min-width: 360px;
  height: 100vh;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  margin: 0px auto;
  max-width: 1080px;
  min-height: calc(100% - 108px);
  background-color: var(--sectionLine);
`;
const Content = styled.div`
  min-height: calc(100vh - 108px);
  background-color: var(--bg);
  margin: 0px auto;
`;
