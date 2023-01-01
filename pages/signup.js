import regExp from "@/constants/regExp";
import { memberState } from "@/recoil/atom";
import { signupState } from "@/recoil/atom";
import styled from "@emotion/styled";
import champions from "lol-champions";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LargeButton from "@/components/common/Buttons/LargeButton";
import LineInput from "@/components/common/Inputs/LineInput";
import Loading from "@/components/common/Loading";
import Completion from "@/components/signup/Completion";
import InputId from "@/components/signup/InputId";
import InputPw from "@/components/signup/InputPw";
import ProcessDot from "@/components/signup/ProcessDot";
import ProfileImg from "@/components/signup/ProfileImg";
import Terms from "@/components/signup/Terms";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";

function Signup() {
  const [signup, setSignup] = useRecoilState(signupState);

  const [process, setProcess] = useState(0);

  useEffect(() => {
    console.log(signup);
  }, [process]);

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
        {process === 1 && <InputId setProcess={setProcess}></InputId>}
        {process === 2 && <InputPw setProcess={setProcess}></InputPw>}
        {process === 3 && <ProfileImg setProcess={setProcess}></ProfileImg>}
        {process === 4 && <Completion></Completion>}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.div`
  width: 100vw;
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
