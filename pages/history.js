import styled from "@emotion/styled";
import moment from "moment";
import React, { useEffect, useState } from "react";
import LargeButton from "@/components/common/Buttons/LargeButton";
import SmallButton from "@/components/common/Buttons/SmallButton";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/SessionLayout";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";
import MinusSvg from "@/svg/MinusSvg";
import PlusSvg from "@/svg/PlusSvg";

function History() {
  const userList = ["maxosa72", "kjy1787", "jiseok2301"];
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    player1: "",
    player2: "",
    score1: 0,
    score2: 0,
  });

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

  const saveData = () => {
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

    setIsLoading(true);
    Axios.post("/api/v1/history", req).then((res) => {
      setIsLoading(false);
      if (res.data.message) {
        ModalUtils.openAlert({ message: res.data.message });
      } else {
        ModalUtils.openAlert({ message: "데이터가 저장되었습니다." });
        setInputs({
          player1: "",
          player2: "",
          score1: 0,
          score2: 0,
        });
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Column width="40%">
            {userList.map((user, key) => (
              <LargeButton
                key={key}
                type={user === inputs.player1 ? "" : "sub"}
                onClick={() => setInputs({ ...inputs, player1: user })}
              >
                {user}
              </LargeButton>
            ))}
          </Column>
          <Column width="10%"></Column>
          <Column width="40%">
            {userList.map((user, key) => (
              <LargeButton
                key={key}
                type={user === inputs.player2 ? "" : "sub"}
                onClick={() => setInputs({ ...inputs, player2: user })}
              >
                {user}
              </LargeButton>
            ))}
          </Column>
        </Row>
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
              <BoxContainer>
                <SmallButton onTouchStart={() => onChangeScore("score1", -1)}>
                  <MinusSvg color="white"></MinusSvg>
                </SmallButton>
                <SmallButton onTouchStart={() => onChangeScore("score1", 1)}>
                  <PlusSvg color="white"></PlusSvg>
                </SmallButton>
              </BoxContainer>
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
              <BoxContainer>
                <SmallButton onTouchStart={() => onChangeScore("score2", -1)}>
                  <MinusSvg color="white"></MinusSvg>
                </SmallButton>
                <SmallButton onTouchStart={() => onChangeScore("score2", 1)}>
                  <PlusSvg color="white"></PlusSvg>
                </SmallButton>
              </BoxContainer>
            </Row>
          </Column>
        </Row>
      </Container>
      <LargeButton onClick={saveData}>
        {isLoading ? <Loading color="white"></Loading> : "서버 전송"}
      </LargeButton>
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
  padding: 60px 24px 20px 24px;
  height: calc(100vh - 108px);
`;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  border-radius: 15px;
  background-color: var(--textBox);
  text-align: center;
`;
const BoxContainer = styled.div`
  display: flex;
  gap: 16px;
`;
