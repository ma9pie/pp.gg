import styled from "@emotion/styled";
import React from "react";
import LargeButton from "@/components/common/Buttons/LargeButton";

function Completion() {
  return (
    <Wrapper>
      <TitleBox>
        <IconWrapper>🎉</IconWrapper>
        <Title>회원가입이</Title>
        <Title>완료되었습니다.</Title>
      </TitleBox>

      <ButtonContainer>
        <LargeButton onClick={() => (window.location.href = "/")}>
          홈으로 이동
        </LargeButton>
        <LargeButton onClick={() => (window.location.href = "/login")}>
          로그인 하기
        </LargeButton>
      </ButtonContainer>
    </Wrapper>
  );
}

export default Completion;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 200px);
`;
const TitleBox = styled.div`
  padding: 32px 0px 80px 0px;
`;
const IconWrapper = styled.div`
  font-size: 80px;
  line-height: 140%;
  text-align: center;
  margin-bottom: 32px;
`;
const Title = styled.p`
  font: var(--headline24);
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: auto;
`;
