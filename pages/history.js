import styled from "@emotion/styled";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import LargeButton from "@/components/common/Buttons/LargeButton";
import SmallButton from "@/components/common/Buttons/SmallButton";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/SessionLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import MinusSvg from "@/svg/MinusSvg";
import PlusSvg from "@/svg/PlusSvg";

function History() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [inputs, setInputs] = useState({
    player1: "",
    player2: "",
    score1: 11,
    score2: 11,
  });

  const userListQueryKey = "/api/v1/userList";

  const userList =
    useQuery({
      queryKey: userListQueryKey,
      queryFn: () => AxiosUtils.get(userListQueryKey).then((res) => res.data),
    }).data || [];

  const onChangeInputs = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChangeScore = (name, value) => {
    let tmpInputs = { ...inputs };
    tmpInputs[name] += value;

    if (tmpInputs[name] < 0) {
      tmpInputs[name] = 0;
    }
    setInputs(tmpInputs);
  };

  // 기록 저장
  const saveData = useDebounce(() => {
    const date = moment().format("YYYY-MM-DD HH:mm");
    const { player1, player2, score1, score2 } = inputs;
    let winnerId, loserId, winnerScore, loserScore;

    // player 입력 오류
    if (!player1 || !player2) {
      ModalUtils.openAlert({ message: "player의 아이디를 입력해주세요." });
      return;
    }

    // score 입력 오류
    if (!score1 && !score2) {
      ModalUtils.openAlert({ message: "score를 입력해주세요." });
      return;
    }

    if (score1 >= score2) {
      winnerId = player1;
      winnerScore = score1;
      loserId = player2;
      loserScore = score2;
    } else {
      winnerId = player2;
      winnerScore = score2;
      loserId = player1;
      loserScore = score1;
    }

    const req = {
      date: date,
      winnerId: winnerId,
      loserId: loserId,
      winnerScore: winnerScore,
      loserScore: loserScore,
    };

    setIsLoadingSave(true);
    Axios.post("/api/v1/history", req).then((res) => {
      setIsLoadingSave(false);
      if (res.data.message) {
        ModalUtils.openAlert({ message: res.data.message });
      } else {
        ModalUtils.openAlert({ message: "데이터가 저장되었습니다." });
        setInputs({
          player1: res.data.winnerId,
          player2: "",
          score1: 11,
          score2: 11,
        });
      }
    });
  }, 100);

  // 기록 삭제
  const deleteLastData = useDebounce(() => {
    setIsLoadingDelete(true);
    Axios.delete("/api/v1/lastHistory").then((res) => {
      setIsLoadingDelete(false);
      ModalUtils.openAlert({ message: JSON.stringify(res.data) });
      ModalUtils.openAlert({
        message: "기록이 삭제되었습니다.",
        component: () => (
          <ContentWrapper>
            <TextBox>
              <Text>{`일시 : ${res.data.date}`}</Text>
              <Text>{`승자 : ${res.data.winnerId} (${res.data.winnerScore} points)`}</Text>
              <Text>{`패자 : ${res.data.loserId} (${res.data.loserScore} points)`}</Text>
            </TextBox>
          </ContentWrapper>
        ),
      });
    });
  }, 100);

  return (
    <Wrapper>
      <Container>
        {userList ? (
          <Row>
            <Column width="50%">
              {userList.map((user) => (
                <UserBox
                  key={user.id}
                  onClick={() => setInputs({ ...inputs, player1: user.id })}
                >
                  <ProfileImgWrapper>
                    <Image
                      src={user.imgUrl}
                      alt="profileImg"
                      width={28}
                      height={28}
                    ></Image>
                  </ProfileImgWrapper>
                  <UserName>{user.name}</UserName>
                </UserBox>
              ))}
            </Column>
            <Column width="50%">
              {userList.map((user) => (
                <UserBox
                  key={user.id}
                  onClick={() => setInputs({ ...inputs, player2: user.id })}
                >
                  <ProfileImgWrapper>
                    <Image
                      src={user.imgUrl}
                      alt="profileImg"
                      width={28}
                      height={28}
                    ></Image>
                  </ProfileImgWrapper>
                  <UserName>{user.name}</UserName>
                </UserBox>
              ))}
            </Column>
          </Row>
        ) : (
          <Row>
            <Loading margin="100px 0px"></Loading>
          </Row>
        )}
      </Container>

      <Container>
        <Row>
          <Column width="40%">
            <Row>player1</Row>
            <Row>
              <InputBox
                height="40px"
                type="text"
                name="player1"
                value={inputs.player1}
                onChange={onChangeInputs}
              ></InputBox>
            </Row>
            <Row>
              <InputBox
                height="60px"
                type="number"
                name="score1"
                value={inputs.score1}
                onChange={onChangeInputs}
              ></InputBox>
            </Row>
            <Row width="100%">
              <ButtonContainer>
                <SmallButton onTouchStart={() => onChangeScore("score1", -1)}>
                  <MinusSvg color="white"></MinusSvg>
                </SmallButton>
                <SmallButton onTouchStart={() => onChangeScore("score1", 1)}>
                  <PlusSvg color="white"></PlusSvg>
                </SmallButton>
              </ButtonContainer>
            </Row>
          </Column>
          <Column width="10%">vs</Column>
          <Column width="40%">
            <Row>player2</Row>
            <Row>
              <InputBox
                height="40px"
                type="text"
                name="player2"
                value={inputs.player2}
                onChange={onChangeInputs}
              ></InputBox>
            </Row>
            <Row>
              <InputBox
                height="60px"
                type="number"
                name="score2"
                value={inputs.score2}
                onChange={onChangeInputs}
              ></InputBox>
            </Row>
            <Row width="100%">
              <ButtonContainer>
                <SmallButton onTouchStart={() => onChangeScore("score2", -1)}>
                  <MinusSvg color="white"></MinusSvg>
                </SmallButton>
                <SmallButton onTouchStart={() => onChangeScore("score2", 1)}>
                  <PlusSvg color="white"></PlusSvg>
                </SmallButton>
              </ButtonContainer>
            </Row>
          </Column>
        </Row>
      </Container>
      <ButtonContainer>
        <ButtonBox flex={4}>
          <LargeButton onClick={saveData} disabled={isLoadingSave}>
            {isLoadingSave ? <Loading color="white"></Loading> : "저장"}
          </LargeButton>
        </ButtonBox>
        <ButtonBox flex={1}>
          <LargeButton
            onClick={() => {
              ModalUtils.openConfirm({
                message: "가장 최신 기록을 삭제하시겠습니까?",
                onRequestConfirm: () => {
                  deleteLastData();
                },
              });
            }}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? <Loading color="white"></Loading> : "삭제"}
          </LargeButton>
        </ButtonBox>
      </ButtonContainer>
    </Wrapper>
  );
}

export default History;

History.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 16px;
`;
const Container = styled.div`
  margin-bottom: 24px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  gap: 8px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  gap: 8px;
`;
const InputBox = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  padding: 0px 10px;
  border-radius: 10px;
  background-color: var(--textBox);
  text-align: center;
  border: 1px solid var(--sectionLine);
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const ButtonBox = styled.div`
  width: 100%;
  flex: ${(props) => props.flex};
`;
const ContentWrapper = styled.div`
  margin-bottom: 16px;
`;
const TextBox = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 16px;
  background-color: var(--textBox);
  border: 1px solid var(--sectionLine);
  & * {
    background-color: inherit;
  }
`;
const Text = styled.p`
  font: var(--body14);
  text-align: left;
`;
const UserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 36px;
  padding: 0px 8px;
  border-radius: 5px;
  background-color: var(--textBox);
  border: 1px solid var(--sectionLine);
  user-select: none;
  cursor: pointer;
  &:active {
    background-color: var(--icon1);
  }
  & * {
    background-color: inherit;
  }
  transition: background-color 0.2s ease;
`;
const ProfileImgWrapper = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserName = styled.p`
  font: var(--caption12);
`;
