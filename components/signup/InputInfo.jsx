import regExp from "@/constants/regExp";
import { signupState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LargeButton from "@/components/common/Buttons/LargeButton";
import LineInput from "@/components/common/Inputs/LineInput";
import Loading from "@/components/common/Loading";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function InputInfo(props) {
  const [signup, setSignup] = useRecoilState(signupState);

  const [id, setId] = useState("");
  const [idErrMsg, setIdErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [name, setName] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userListQueryKey = "/api/v1/allUser";
  const userList = useQuery({
    queryKey: userListQueryKey,
    queryFn: async () => {
      return Axios.get(userListQueryKey, {
        params: {},
      }).then((res) => res.data);
    },
  });

  // 아이디 입력
  const handleId = (e) => {
    const { value } = e.target;

    const user = userList.data.find((user) => user.id === value);

    if (user) {
      setIdErrMsg("이미 존재하는 아이디 입니다.");
    } else {
      if (!regExp.idCheckRegExp.test(value)) {
        setIdErrMsg("영문, 숫자 6~20자리를 입력해주세요.");
      } else {
        setIdErrMsg("");
      }
    }
    setId(value.trim());
  };

  // 패스워드 입력
  const handlePassword = (e) => {
    const { value } = e.target;
    if (!regExp.passwordCheckRegExp.test(value)) {
      setPasswordErrMsg(
        "최소 8자 이상, 하나 이상의 문자와 하나의 숫자를 입력해주세요."
      );
    } else {
      setPasswordErrMsg("");
    }
    setPassword(value.trim());
  };

  // 닉네임 입력
  const handleName = (e) => {
    const { value } = e.target;
    const user = userList.data.find((user) => user.name === value);
    if (user) {
      setNameErrMsg("이미 존재하는 닉네임 입니다.");
    } else {
      setNameErrMsg("");
    }
    setName(value.trim());
  };

  // 버튼 비활성화
  const disableButton = () => {
    if (
      id !== "" &&
      password !== "" &&
      name !== "" &&
      idErrMsg === "" &&
      passwordErrMsg === "" &&
      nameErrMsg === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // 다음
  const next = () => {
    setSignup({
      ...signup,
      id: id,
      password: password,
      name: name,
    });
    props.setProcess(2);
  };

  if (userList.status !== "success") {
    return <Loading></Loading>;
  }

  return (
    <Wrapper>
      <Title>기본정보입력</Title>

      <TextBox>
        <Text>
          로그인에 사용할 아이디와 패스워드, 그리고 닉네임을 입력해주세요.
        </Text>
      </TextBox>

      <InputBoxContainer>
        <InputBox>
          <LineInput
            type="text"
            label="아이디"
            value={id}
            placeholder="아이디를 입력해주세요."
            errorMsg={id === "" ? "" : idErrMsg}
            onChange={handleId}
          ></LineInput>
        </InputBox>
        <InputBox>
          <LineInput
            type="password"
            label="비밀번호"
            value={password}
            placeholder="비밀번호를 입력해주세요."
            errorMsg={password === "" ? "" : passwordErrMsg}
            onChange={handlePassword}
          ></LineInput>
        </InputBox>
        <InputBox>
          <LineInput
            type="name"
            label="닉네임"
            value={name}
            placeholder="닉네임을 입력해주세요."
            errorMsg={name === "" ? "" : nameErrMsg}
            onChange={handleName}
          ></LineInput>
        </InputBox>
      </InputBoxContainer>

      <LargeButton disabled={disableButton()} onClick={next}>
        다음
      </LargeButton>
    </Wrapper>
  );
}

export default InputInfo;

const Wrapper = styled.div``;
const Title = styled.p`
  font: var(--headline24);
`;
const InputBoxContainer = styled.div`
  margin-bottom: 80px;
`;
const InputBox = styled.div`
  margin-bottom: 24px;
`;
const TextBox = styled.div`
  margin: 12px 0px 32px 0px;
  padding: 16px;
  background-color: var(--textBox);
  & * {
    background-color: inherit;
  }
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
