import regExp from "@/constants/regExp";
import { memberState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import LargeButton from "@/components/common/Buttons/LargeButton";
import LineInput from "@/components/common/Inputs/LineInput";
import Loading from "@/components/common/Loading";
import AxiosUtils from "@/utils/AxiosUtils";
import ModalUtils from "@/utils/ModalUtils";

function Login() {
  const router = useRouter();
  const [member, setMember] = useRecoilState(memberState);

  const [id, setId] = useState("");
  const [idErrMsg, setIdErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleId = (e) => {
    const { value } = e.target;
    if (!regExp.idCheckRegExp.test(value)) {
      setIdErrMsg("영문, 숫자 조합 6~20자리를 입력해주세요.");
    } else {
      setIdErrMsg("");
    }
    setId(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const login = () => {
    const req = {
      id: id,
      password: password,
    };
    setIsLoading(true);
    AxiosUtils.post("/api/v1/login", req).then((res) => {
      setIsLoading(false);
      if (res.data) {
        setMember(res.data);
        router.push("/");
      } else {
        ModalUtils.openAlert({
          message: "아이디 또는 패스워드가 일치하지 않습니다.",
        });
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disableButton()) {
      login();
    }
  };

  const disableButton = () => {
    return idErrMsg || !id || !password;
  };

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

        <InputBoxContainer>
          <InputBox>
            <LineInput
              type="text"
              label="아이디"
              value={id}
              placeholder="아이디를 입력해주세요."
              errorMsg={idErrMsg}
              onChange={handleId}
              onKeyUp={handleKeyPress}
            ></LineInput>
          </InputBox>
          <InputBox>
            <LineInput
              type="password"
              label="비밀번호"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePassword}
              onKeyUp={handleKeyPress}
            ></LineInput>
          </InputBox>
        </InputBoxContainer>

        <LargeButton disabled={isLoading || disableButton()} onClick={login}>
          {isLoading ? <Loading color="white"></Loading> : "로그인"}
        </LargeButton>

        <TextLine>
          <Text>PP.GG에 처음이세요?</Text>
          <Link href="/signup">
            <a>
              <LinkText>회원가입하기</LinkText>
            </a>
          </Link>
        </TextLine>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 120px 0;
  background-color: var(--sectionLine);
`;
const ContentWrapper = styled.div`
  max-width: 450px;
  margin: 0px auto;
  padding: 40px;
  background-color: var(--bg);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
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
const TextLine = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;
const Text = styled.p`
  font: var(--body14);
`;
const LinkText = styled.p`
  font: var(--body14);
  color: var(--brandColor);
  text-decoration: underline;
  text-underline-position: under;
`;
