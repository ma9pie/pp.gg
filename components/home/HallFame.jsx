import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";

function HallFame(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(props.userList.sort((a, b) => b.winRate - a.winRate));
  }, [props]);

  const getMedal = (num) => {
    if (num === 1) return "π₯";
    if (num === 2) return "π₯";
    if (num === 3) return "π₯";
    return num;
  };

  return (
    <Wrapper>
      <TitleBox>
        <Title>π λͺμμ μ λΉ</Title>
        {props.historyLength > 0 && (
          <Description>{`(μ΄ κ²μ μ : ${props.historyLength}κ²μ)`}</Description>
        )}
      </TitleBox>

      <Table>
        <Row bg="var(--disabled)">
          <Column>#</Column>
          <Column>νλ μ΄μ΄</Column>
          <Column>ν°μ΄</Column>
          <Column>μΉλ₯ </Column>
        </Row>
        {userList.length === 0 ? (
          <LoadingWrapper>
            <Loading></Loading>
          </LoadingWrapper>
        ) : (
          userList.map((item, idx) => (
            <Link key={item.id} href={`/players/${item.id}`}>
              <a>
                <Row bg="var(--textBox)">
                  <Column>{getMedal(idx + 1)}</Column>
                  <Column>
                    <FlexBox>
                      <ImageWrapper>
                        <Image
                          src={item.imgUrl}
                          width={32}
                          height={32}
                          alt="profileImg"
                        ></Image>
                      </ImageWrapper>
                      {item.name}
                    </FlexBox>
                  </Column>
                  <Column>{item.tier}</Column>
                  <Column>{item.winRate.toFixed(2)}%</Column>
                </Row>
              </a>
            </Link>
          ))
        )}
      </Table>
    </Wrapper>
  );
}
export default HallFame;

const Wrapper = styled.div`
  width: 100vw;
  min-width: 280px;
  max-width: 1080px;
  padding: 0px 32px;
  background-color: var(--homeBg);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 16px;
`;
const Title = styled.div`
  font: var(--headline18);
  color: white;
  text-align: center;
  background-color: inherit;
`;
const Description = styled.p`
  font: var(--caption12);
  color: var(--sub);
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 8px;
  background-color: ${(props) => props.bg};
  & * {
    background-color: inherit;
  }
`;
const Column = styled.div`
  font: var(--caption12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;

  &:nth-of-type(1) {
    flex: 15;
  }
  &:nth-of-type(2) {
    flex: 80;
  }
  &:nth-of-type(3) {
    flex: 40;
  }
  &:nth-of-type(4) {
    flex: 30;
    text-align: right;
  }
`;
const LoadingWrapper = styled.div`
  padding: 100px 0px;
`;
const ImageWrapper = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
