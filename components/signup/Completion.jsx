import styled from "@emotion/styled";
import React from "react";
import LargeButton from "@/components/common/Buttons/LargeButton";

function Completion() {
  return (
    <Wrapper>
      <TitleBox>
        <IconWrapper>π</IconWrapper>
        <Title>νμκ°μμ΄</Title>
        <Title>μλ£λμμ΅λλ€.</Title>
      </TitleBox>

      <ButtonContainer>
        <LargeButton onClick={() => (window.location.href = "/")}>
          νμΌλ‘ μ΄λ
        </LargeButton>
        <LargeButton onClick={() => (window.location.href = "/login")}>
          λ‘κ·ΈμΈ νκΈ°
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
