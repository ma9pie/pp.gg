import styled from "@emotion/styled";
import Axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import DoughnutChart from "@/components/common/Chart/DoughnutChart";
import LineChart from "@/components/common/Chart/LineChart";
import HistoryList from "@/components/players/HistoryList";
import Profile from "@/components/players/Profile";
import PlayerLayout from "@/layouts/PlayerLayout";
import TierUtils from "@/utils/TierUtils";
import useQuery from "@/hooks/useQuery";

function Players() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [totalDeal, setTotalDeal] = useState(0);
  const [totalDamageReceived, setTotalDamageReceived] = useState(0);
  const [winPoints, setWinPoints] = useState(0);
  const [losePoints, setLosePoints] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [rateHistory, setRateHistory] = useState({
    rate: [],
    date: [],
    tier: [],
  });

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

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
    if (id && userList.data && history.data) {
      // 통계
      let totalDeal = 0; // 적에게 가한 피해량
      let totalDamageReceived = 0; // 적에게 받은 피해량
      let winPoints = 0; // 승리 횟수
      let losePoints = 0; // 패배 횟수
      let winRate = 0; // 승률
      history.data.map((history) => {
        if (history.winnerId === id) {
          totalDeal += history.winnerScore;
          totalDamageReceived += history.loserScore;
          winPoints++;
        } else if (history.loserId === id) {
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

      setTotalDeal(totalDeal);
      setTotalDamageReceived(totalDamageReceived);
      setWinPoints(winPoints);
      setLosePoints(losePoints);
      setWinRate(winRate);

      // 전적
      let list = [];
      let opponents = "";

      history.data.map((history) => {
        let kill = 0;
        let death = 0;
        if (history.winnerId === id) {
          kill = history.winnerScore;
          death = history.loserScore;
          opponents = history.loserId;
        } else if (history.loserId === id) {
          kill = history.loserScore;
          death = history.winnerScore;
          opponents = history.winnerId;
        } else {
          return false;
        }

        list.push({
          id: id,
          kill: kill,
          death: death,
          opponents: opponents,
          date: history.date,
        });
      });

      setGameList(list);
    }
  }, [id, userList.data, history.data]);

  useEffect(() => {
    if (id && userList.data && history.data) {
      // 전적 히스토리
      let winPoints = 0; // 승리 횟수
      let losePoints = 0; // 패배 횟수
      let winRate = 0; // 승률
      let date = "";
      let tier = "";
      const tmpRate = [];
      const tmpDate = [];
      const tmpTier = [];

      []
        .concat(history.data)
        .reverse()
        .map((history) => {
          if (history.winnerId !== id && history.loserId !== id) {
            return;
          }

          if (history.winnerId === id) {
            winPoints++;
          } else if (history.loserId === id) {
            losePoints++;
          }

          winRate = (winPoints / (winPoints + losePoints)) * 100;
          date = moment(history.date).format("YYYY-MM-DD");
          tier = TierUtils.getTier(winRate);

          if (date === tmpDate[tmpDate.length - 1]) {
            tmpRate[tmpRate.length - 1] = winRate;
            tmpTier[tmpTier.length - 1] = tier;
          } else {
            tmpRate.push(winRate);
            tmpDate.push(date);
            tmpTier.push(tier);
          }
        });
      setRateHistory({
        rate: tmpRate,
        date: tmpDate,
        tier: tmpTier,
      });
    }
  }, [id, userList.data, history.data]);

  return (
    <Wrapper>
      <Profile id={id}></Profile>

      <Row>
        <ChartContainer>
          <Content height="auto">
            <Box>
              <Title>승률 추이</Title>
              <LineChart
                margin="20px auto"
                labels={rateHistory.date}
                data={rateHistory.rate}
              ></LineChart>
              <TextBoxWrapper>
                <TextBox>
                  <SubText>일자</SubText>
                  {rateHistory.date.map((item, key) => (
                    <SubText key={key}>{item}</SubText>
                  ))}
                </TextBox>
                <TextBox>
                  <Text>티어</Text>
                  {rateHistory.tier.map((item, key) => (
                    <Text key={key}>{item}</Text>
                  ))}
                </TextBox>
                <TextBox>
                  <Text>승률</Text>
                  {rateHistory.rate.map((item, key) => (
                    <Text key={key}>{item.toFixed(2)}%</Text>
                  ))}
                </TextBox>
              </TextBoxWrapper>
            </Box>
          </Content>
          <Content height="auto">
            <Box>
              <Title>총 전적</Title>
              <DoughnutChart
                width="200px"
                height="200px"
                margin="20px auto"
                labels={["승리", "패배"]}
                data={[winPoints, losePoints]}
              ></DoughnutChart>
              <Text textAlign="center">{`${
                winPoints + losePoints
              }전 ${winPoints}승 ${losePoints}패 (승률: ${winRate.toFixed(
                2
              )}%)`}</Text>
            </Box>
          </Content>
          <Content height="auto">
            <Box>
              <Title>딜량</Title>
              <DoughnutChart
                width="200px"
                height="200px"
                margin="20px auto"
                labels={[
                  `적에게 가한 피해량 (${totalDeal})`,
                  `적에게 받은 피해량 (${totalDamageReceived})`,
                ]}
                data={[totalDeal, totalDamageReceived]}
              ></DoughnutChart>
            </Box>
          </Content>
        </ChartContainer>

        <HistoryContainer>
          {gameList.map((data, key) => (
            <Content key={key} height="auto">
              <HistoryList {...data} userList={userList.data}></HistoryList>
            </Content>
          ))}
        </HistoryContainer>
      </Row>
    </Wrapper>
  );
}

export default Players;

Players.getLayout = function getLayout(page) {
  return <PlayerLayout>{page}</PlayerLayout>;
};

const Wrapper = styled.div``;
const Row = styled.div`
  gap: 16px;
  max-width: 1080px;
  margin: 16px auto;
  @media (min-width: 1080px) {
    display: flex;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${(props) => props.width};
`;
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  width: ${(props) => props.width};
  @media (min-width: 1080px) {
    width: 30%;
  }
  @media (max-width: 1080px) {
    width: 100%;
  }
`;
const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${(props) => props.width};
  @media (min-width: 1080px) {
    width: 70%;
  }
  @media (max-width: 1080px) {
    width: 100%;
  }
`;
const Content = styled.section`
  display: flex;
  gap: 16px;
  width: 100%;
  height: ${(props) => props.height};
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--bg);
`;
const Box = styled.div`
  width: 100%;
  padding: 24px;
`;
const Title = styled.p`
  font: var(--headline18);
`;
const TextBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
  & > div {
    flex: 1;
  }
`;
const TextBox = styled.div``;
const Text = styled.p`
  font: var(--body14);
  text-align: ${(props) => props.textAlign};
`;
const SubText = styled.p`
  font: var(--body14);
  color: var(--sub);
`;
