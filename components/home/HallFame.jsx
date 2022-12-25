import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function HallFame() {
  const [statisticsList, setStatisticsList] = useState([]);

  const userListQueryKey = "/api/v1/allUser";
  const userList = useQuery({
    queryKey: userListQueryKey,
    queryFn: async () => {
      let tmpUserList = await Axios.get(userListQueryKey, {
        params: {},
      }).then((res) => res.data);

      await Promise.all(
        tmpUserList.map((user) =>
          Axios.get("/api/v1/tier", {
            params: { id: user.id },
          }).then((res) => {
            user.tier = res.data.tier;
          })
        )
      );
      return tmpUserList;
    },
  });

  const historyQueryKey = "/api/v1/history";
  const history = useQuery({
    queryKey: historyQueryKey,
    queryFn: () =>
      Axios.get(historyQueryKey, {
        params: {},
      }).then((res) => res.data),
  });

  useEffect(() => {
    if (userList.data && history.data) {
      let tmpList = [];

      userList.data.map((user) => {
        let totalDeal = 0; // 적에게 가한 피해량
        let totalDamageReceived = 0; // 적에게 받은 피해량
        let winPoints = 0; // 승리 횟수
        let losePoints = 0; // 패배 횟수
        let winRate = 0;
        history.data.map((history) => {
          if (history.winnerId === user.id) {
            totalDeal += history.winnerScore;
            totalDamageReceived += history.loserScore;
            winPoints++;
          } else if (history.loserId === user.id) {
            totalDeal += history.loserScore;
            totalDamageReceived += history.winnerScore;
            losePoints++;
          }
        });

        if (winPoints === 0) {
          winRate = 0;
        } else {
          winRate = (winPoints / (winPoints + losePoints)) * 100;
        }

        tmpList.push({
          ...user,
          totalDeal: totalDeal,
          totalDamageReceived: totalDamageReceived,
          winPoints: winPoints,
          losePoints: losePoints,
          winRate: winRate,
        });
      });
      tmpList.sort((a, b) => b.winRate - a.winRate);
      setStatisticsList(tmpList);
    }
  }, [userList.data, history.data]);

  const getMedal = (num) => {
    if (num === 1) return "🥇";
    if (num === 2) return "🥈";
    if (num === 3) return "🥉";
  };

  return (
    <Wrapper>
      <Title>🏆 명예의 전당</Title>

      <Table>
        <Row bg="var(--disabled)">
          <Column>#</Column>
          <Column>플레이어</Column>
          <Column>티어</Column>
          <Column>승률</Column>
        </Row>
        {statisticsList ? (
          statisticsList.map((item, idx) => (
            <Link key={item.key} href={`/players/${item.id}`}>
              <a>
                <Row bg="var(--textBox)">
                  <Column>
                    {idx + 1}
                    {getMedal(idx + 1)}
                  </Column>
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
        ) : (
          <LoadingWrapper>
            <Loading></Loading>
          </LoadingWrapper>
        )}
      </Table>
    </Wrapper>
  );
}
export default HallFame;
const Wrapper = styled.div`
  width: 100vw;
  max-width: 1080px;
  padding: 0px 32px;
  background-color: var(--homeBg);
`;
const Title = styled.div`
  font: var(--headline18);
  text-align: center;
  margin-bottom: 16px;
  background-color: inherit;
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
