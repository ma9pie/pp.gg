import { memberState } from "@/recoil/atom";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Footer from "@/components/layout/Footer";
import Head from "@/components/layout/Head";
import Header from "@/components/layout/Header";
import ModalUtils from "@/utils/ModalUtils";

function SessionLayout(props) {
  const router = useRouter();
  const [member, setMember] = useRecoilState(memberState);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!member.key) {
      ModalUtils.openAlert({
        message: "로그인 후 이용 가능합니다.",
      });
      router.push("/");
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [member, router]);

  if (!isLogin) return null;

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

export default SessionLayout;

const Container = styled.div`
  height: 100vh;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  margin: 0px auto;
  width: 1080px;
  min-height: calc(100% - 108px);
  background-color: var(--sectionLine);
`;
const Content = styled.div`
  min-height: calc(100vh - 108px);
  background-color: var(--bg);
  margin: 0px auto;
  padding: 60px 0px;
`;
