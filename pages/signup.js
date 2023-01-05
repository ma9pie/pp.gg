import { signupState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import Completion from "@/components/signup/Completion";
import InputInfo from "@/components/signup/InputInfo";
import ProcessDot from "@/components/signup/ProcessDot";
import ProfileImg from "@/components/signup/ProfileImg";
import Terms from "@/components/signup/Terms";

function Signup() {
  const resetSignupState = useResetRecoilState(signupState);

  const [process, setProcess] = useState(0);

  useEffect(() => {
    resetSignupState();
  }, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleBox>
          <Link href="/" passHref>
            <a>
              <Title>PP.GG</Title>
            </a>
          </Link>
        </TitleBox>

        <ProcessDot process={process}></ProcessDot>

        {process === 0 && <Terms setProcess={setProcess}></Terms>}
        {process === 1 && <InputInfo setProcess={setProcess}></InputInfo>}
        {process === 2 && <ProfileImg setProcess={setProcess}></ProfileImg>}
        {process === 3 && <Completion></Completion>}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.div`
  width: 100vw;
  min-width: 280px;
  min-height: 100vh;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  max-width: 600px;
  min-height: 100vh;
  margin: 0px auto;
  padding: 40px;
  background-color: var(--bg);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.p`
  font-size: 48px;
  font-weight: 900;
  color: var(--brandColor);
`;
const InputBoxContainer = styled.div`
  margin-bottom: 160px;
`;
const InputBox = styled.div`
  margin-bottom: 24px;
`;
