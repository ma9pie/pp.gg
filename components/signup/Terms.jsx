import { signupState } from "@/recoil/atom";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LargeButton from "@/components/common/Buttons/LargeButton";
import CheckBox from "@/components/common/CheckBox";
import Loading from "@/components/common/Loading";
import AxiosUtils from "@/utils/AxiosUtils";

function Terms(props) {
  const [signup, setSignup] = useRecoilState(signupState);

  const [terms, setTerms] = useState([]);
  const [activeButton, setActiveButton] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [check, setCheck] = useState({
    TERMS_OF_USE: false,
    PRIVACY_AGREE: false,
    MARKETING_TERMS: false,
  });

  const { TERMS_OF_USE, PRIVACY_AGREE, MARKETING_TERMS } = check;

  // 약관 동의 API 호출
  useEffect(() => {
    AxiosUtils.get("/api/v1/terms").then((res) => {
      setTerms(res.data);
    });
  }, []);

  // 버튼 활성화
  useEffect(() => {
    if (TERMS_OF_USE && PRIVACY_AGREE) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [check]);

  // 약관 동의
  const handleCheck = (type) => {
    let isCheckedAll = true;
    const tmpCheck = { ...check };
    tmpCheck[type] = !tmpCheck[type];
    setCheck(tmpCheck);
    Object.keys(tmpCheck).map((key) => {
      isCheckedAll = isCheckedAll && tmpCheck[key];
    });
    if (isCheckedAll) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };

  // 약관 전체 동의
  const handleCheckAll = () => {
    const tmpCheck = { ...check };
    Object.keys(tmpCheck).map((key) => {
      tmpCheck[key] = !checkAll;
    });
    setCheck(tmpCheck);
    setCheckAll(!checkAll);
  };

  const next = () => {
    setSignup({
      ...signup,
      termsCheck: [TERMS_OF_USE, PRIVACY_AGREE, MARKETING_TERMS],
    });
    props.setProcess(1);
  };

  if (terms.length === 0) {
    return <Loading></Loading>;
  }

  return (
    <Wrapper>
      <Content>
        <TitleBox onClick={handleCheckAll}>
          <Text>
            이용약관, 개인정보 수집 및 이용, 프로모션 알림 메일 및 푸시 알림
            수신(선택)에 모두 동의합니다.
          </Text>
          <CheckBox checked={checkAll}></CheckBox>
        </TitleBox>
      </Content>

      <Divider></Divider>

      {terms.map((item) => (
        <Content key={item.type}>
          <TitleBox onClick={() => handleCheck(item.type)}>
            <Text>
              {item.title}
              <Optional>{!item.required && "(선택)"}</Optional>
            </Text>
            <CheckBox checked={check[item.type]}></CheckBox>
          </TitleBox>
          {item.html && (
            <TermsBox
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            ></TermsBox>
          )}
        </Content>
      ))}

      <ButtonsWrapper>
        <LargeButton disabled={!activeButton} onClick={next}>
          동의
        </LargeButton>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Terms;
const Wrapper = styled.div``;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
const Text = styled.p`
  font: var(--body16);
`;
const Optional = styled.span`
  font: var(--body16);
  color: var(--sub);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;
const Divider = styled.div`
  margin: 24px 0px;
  border-bottom: 1px solid var(--sectionLine);
`;
const TermsBox = styled.div`
  font: var(--body14);
  max-height: 150px;
  padding: 16px;
  background-color: var(--textBox);
  & * {
    background-color: inherit;
  }
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background: var(--icon1);
  }
`;
const ButtonsWrapper = styled.div`
  margin-top: 48px;
`;
