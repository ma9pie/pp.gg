import styled from "@emotion/styled";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import Profile from "@/components/players/Profile";
import CommonLayout from "@/layouts/CommonLayout";

function Players() {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    console.log(router.query);
    setId(router.query.id);
  }, [router]);

  return (
    <Wrapper>
      <Profile id={id}></Profile>
      <Row>
        <Column width="30%">
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </Column>
        <Column width="70%">
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </Column>
      </Row>
    </Wrapper>
  );
}

export default Players;

Players.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div`
  background-color: var(--sectionLine);
  & * {
    background-color: inherit;
  }
`;
const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 1080px;
  margin: 16px auto;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${(props) => props.width};
`;
const Content = styled.section`
  width: 100%;
  height: 100px;
  background-color: var(--bg);
  border-radius: 5px;
  & * {
    background-color: inherit;
  }
`;
