import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import LineInput from "@/components/common/Inputs/LineInput";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleBox>
          <Title>PP.GG</Title>
        </TitleBox>

        <LineInput
          label="아이디"
          value={id}
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setId(e.target.value)}
        ></LineInput>
        <LineInput
          label="비밀번호"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        ></LineInput>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 120px 0;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  width: 450px;
  margin: 0px auto;
  padding: 40px;
  background-color: var(--bg);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;
const Title = styled.p`
  font-size: 48px;
  font-weight: 900;
  color: var(--brandColor);
`;
