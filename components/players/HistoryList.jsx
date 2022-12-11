import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import TimeUtils from "@/utils/TimeUtils";

function HistoryList(props) {
  const getText = (data) => {
    if (data.kill > data.death) {
      return "승리";
    } else if (data.kill < data.death) {
      return "패배";
    } else {
      return "무승부";
    }
  };
  const getColor = (data) => {
    if (data.kill > data.death) {
      return "var(--winColor)";
    } else if (data.kill < data.death) {
      return "var(--loseColor)";
    } else {
      return "var(--drawColor)";
    }
  };
  const getBackgroundColor = (data) => {
    if (data.kill > data.death) {
      return "var(--winBackgroundColor)";
    } else if (data.kill < data.death) {
      return "var(--loseBackgroundColor)";
    } else {
      return "var(--drawBackgroundColor)";
    }
  };
  const getTier = (id) => {
    const idx = props.userList.findIndex((item) => item.id === id);
    if (idx >= 0) return props.userList[idx].tier;
  };
  const getName = (id) => {
    const idx = props.userList.findIndex((item) => item.id === id);
    if (idx >= 0) return props.userList[idx].name;
  };
  const getImageUrl = (id) => {
    const idx = props.userList.findIndex((item) => item.id === id);
    if (idx >= 0) return props.userList[idx].imgUrl;
  };

  return (
    <Wrapper backgroundColor={getBackgroundColor(props)}>
      <Label backgroundColor={getColor(props)}></Label>
      <Container>
        <Box>
          <Text>솔랭</Text>
          <SubText>{getText(props)}</SubText>
          <SubText>{TimeUtils.getBeforeHours(props.date)}</SubText>
        </Box>

        <Box>
          <Row>
            <Text color="var(--winColor)">{props.kill}</Text>{" "}
            <ImageWrapper>
              {getImageUrl(props.id) && (
                <Image
                  src={getImageUrl(props.id)}
                  width={48}
                  height={48}
                  alt="profileImg"
                ></Image>
              )}
            </ImageWrapper>
            <Column>
              <SubText>{getName(props.id)}</SubText>
              <SubText>{getTier(props.id)}</SubText>
            </Column>
          </Row>
        </Box>

        <Box>
          <BigText>vs</BigText>
        </Box>

        <Box>
          <Row>
            <Text color="var(--loseColor)">{props.death}</Text>
            <ImageWrapper>
              {getImageUrl(props.opponents) && (
                <Image
                  src={getImageUrl(props.opponents)}
                  width={48}
                  height={48}
                  alt="profileImg"
                ></Image>
              )}
            </ImageWrapper>
            <Column>
              <SubText>{getName(props.opponents)}</SubText>
              <SubText>{getTier(props.opponents)}</SubText>
            </Column>
          </Row>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default HistoryList;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 96px;
  background-color: ${(props) => props.backgroundColor};
`;
const Label = styled.div`
  width: 6px;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  z-index: 1;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: auto 0px;
  gap: 8px;
  &:nth-of-type(1) {
    flex: 5;
  }
  &:nth-of-type(2) {
    flex: 10;
  }
  &:nth-of-type(3) {
    flex: 7;
  }
  &:nth-of-type(4) {
    flex: 10;
  }
`;
const Text = styled.p`
  font: var(--headline18);
  color: ${(props) => props.color};
`;
const SubText = styled.p`
  font: var(--body14);
  color: var(--sub);
`;
const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
`;
const BigText = styled.p`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 24px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
