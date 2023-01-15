import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProfileImage from "@/components/common/ProfileImage";
import FilterUtils from "@/utils/FilterUtils";

function Statistics(props) {
  const [maxDamage, setMaxDamage] = useState(0);

  useEffect(() => {
    let tmpMax = 0;
    props.statisticsList.map((user) => {
      tmpMax = Math.max(
        tmpMax,
        user.mmr,
        user.totalDeal,
        user.totalDamageReceived
      );
    });
    setMaxDamage(tmpMax);
  }, [props.statisticsList]);

  const getWidthPercent = (damage) => {
    return `${(damage / maxDamage) * 100}%`;
  };

  return (
    <Wrapper>
      <TitleBox>
        <Title>{props.title}</Title>
        <LegendContainer>
          <Legend>
            <Bar width="50px" backgroundColor="var(--green700)"></Bar> mmr
          </Legend>
          <Legend>
            <Bar width="50px" backgroundColor="var(--winColor)"></Bar>
            적에게 가한 피해량
          </Legend>
          <Legend>
            <Bar width="50px" backgroundColor="var(--loseColor)"></Bar> 적에게
            받은 피해량
          </Legend>
        </LegendContainer>
      </TitleBox>

      <TableContainer>
        {props.statisticsList.map((user, key) => (
          <Link key={user.id} href={`/players/${user.id}`}>
            <a>
              <ListBox>
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
                    <SubText>{FilterUtils.formatPercent(user.winRate)}</SubText>
                  </Column>
                  <Column>
                    <Text>{user.name}</Text>
                    <SubText>{user.tier}</SubText>
                  </Column>
                  <Column>
                    <Bar
                      width={getWidthPercent(user.mmr)}
                      backgroundColor="var(--green700)"
                    >
                      {user.mmr}
                    </Bar>
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
            </a>
          </Link>
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
  margin-bottom: 16px;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;
const LegendContainer = styled.div`
  display: grid;
  gap: 4px;
`;
const Legend = styled.div`
  display: flex;
  gap: 8px;
`;
const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
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
  padding-right: 10px;
  background-color: ${(props) => props.backgroundColor};
  text-align: right;
  color: white;
`;
