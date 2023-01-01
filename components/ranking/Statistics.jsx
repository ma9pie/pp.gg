import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ProfileImage from "@/components/common/ProfileImage";

function Statistics(props) {
  const [maxDamage, setMaxDamage] = useState(0);

  useEffect(() => {
    let tmpMax = 0;
    props.statisticsList.map((user) => {
      tmpMax = Math.max(tmpMax, user.totalDeal, user.totalDamageReceived);
    });
    setMaxDamage(tmpMax);
  }, [props.statisticsList]);

  const getWidthPercent = (damage) => {
    return `${(damage / maxDamage) * 100}%`;
  };

  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <TableContainer>
        {props.statisticsList.map((user, key) => (
          <ListBox key={key}>
            <Row>
              <Column>
                <ProfileImage
                  width="36px"
                  height="36px"
                  src={user.imgUrl}
                  border="3px solid #af8830"
                ></ProfileImage>
              </Column>
              <Column>
                <Text>승률</Text>
                <SubText>{user.winRate.toFixed(2)}%</SubText>
              </Column>
              <Column>
                <Text>{user.name}</Text>
                <SubText>{user.tier}</SubText>
              </Column>
              <Column>
                <Bar
                  width={getWidthPercent(user.totalDeal)}
                  backgroundColor="var(--winColor)"
                >
                  {user.totalDeal}
                </Bar>
                <Bar
                  width={getWidthPercent(user.totalDamageReceived)}
                  backgroundColor="var(--loseColor)"
                >
                  {user.totalDamageReceived}
                </Bar>
              </Column>
            </Row>
          </ListBox>
        ))}
      </TableContainer>
    </Wrapper>
  );
}

export default Statistics;

const Wrapper = styled.div`
  width: 95%;
  margin: 0px auto;
  padding-top: 40px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:nth-of-type(1) {
    width: 36px;
  }
  &:nth-of-type(2) {
    width: 42px;
  }
  &:nth-of-type(3) {
    width: 92px;
  }
  &:nth-of-type(4) {
    flex: 1;
  }
`;
const TableContainer = styled.div``;
const ListBox = styled.div`
  height: 60px;
`;
const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const Text = styled.p`
  font: var(--body14);
`;
const SubText = styled.p`
  font: var(--caption12);
  color: var(--sub);
`;
const Bar = styled.div`
  width: ${(props) => props.width};
  height: 20px;
  line-height: 20px;
  margin: 1px 0px;
  padding-right: 10px;
  background-color: ${(props) => props.backgroundColor};
  text-align: right;
  color: white;
`;
