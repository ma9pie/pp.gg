import styled from "@emotion/styled";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DoughnutChart from "@/components/common/Chart/DoughnutChart";
import LineChart from "@/components/common/Chart/LineChart";
import Loading from "@/components/common/Loading";
import HistoryList from "@/components/players/HistoryList";
import Profile from "@/components/players/Profile";
import PlayerLayout from "@/layouts/PlayerLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import FilterUtils from "@/utils/FilterUtils";
import MmrUtils from "@/utils/MmrUtils";
import ModalUtils from "@/utils/ModalUtils";
import StatisticsUtils from "@/utils/StatisticsUtils";
import TierUtils from "@/utils/TierUtils";
import useQuery from "@/hooks/useQuery";

function Players() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  const [gameList, setGameList] = useState([]);
  const [rateHistory, setRateHistory] = useState({
    rate: [],
    date: [],
    tier: [],
  });

  const userListQueryKey = "/api/v1/userList";
  const historyQueryKey = "/api/v1/history";

  const userList = useQuery({
    placeholderData: [],
    queryKey: userListQueryKey,
    queryFn: () => AxiosUtils.get(userListQueryKey).then((res) => res.data),
  }).data;
  const history = useQuery({
    placeholderData: [],
    queryKey: historyQueryKey,
    queryFn: () => AxiosUtils.get(historyQueryKey).then((res) => res.data),
  }).data;

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

  useEffect(() => {
    const user = userList.find((item) => item.id === id);

    if (id && !user && userList.length > 0) {
      return ModalUtils.openAlert({
        message: "존재하지 않는 사용자입니다.",
        onAfterClose: () => router.push("/"),
      });
    } else if (user) {
      setUser(user);

      const scoreboard = new Map();

      userList.map((item) => {
        scoreboard.set(item.id, {
          mmr: 2000,
          winRate: 0,
          winPoints: 0,
          losePoints: 0,
        });
      });

      const tmpHistory = [].concat(history);
      let gameList = []; // 게임 리스트
      let opponents = ""; // 상대편
      let winRate = 0; // 승률
      let date = ""; // 날짜
      let tier = ""; // 티어
      const tmpRate = [];
      const tmpDate = [];
      const tmpTier = [];

      let points = 0;

      tmpHistory.reverse().map((item) => {
        const player = scoreboard.get(id);
        const winner = scoreboard.get(item.winnerId);
        const loser = scoreboard.get(item.loserId);

        winner.winRate = StatisticsUtils.getWinRate(
          winner.winPoints,
          winner.losePoints
        );
        loser.winRate = StatisticsUtils.getWinRate(
          loser.winPoints,
          loser.losePoints
        );

        points = MmrUtils.getMmrElo(winner, loser);

        winner.mmr += points;
        loser.mmr -= points;
        ++winner.winPoints;
        ++loser.losePoints;

        if (item.winnerId !== id && item.loserId !== id) {
          return;
        }

        let kill = 0;
        let death = 0;

        if (item.winnerId === id) {
          kill = item.winnerScore;
          death = item.loserScore;
          opponents = item.loserId;
        } else if (item.loserId === id) {
          kill = item.loserScore;
          death = item.winnerScore;
          opponents = item.winnerId;
        }

        winRate = StatisticsUtils.getWinRate(
          player.winPoints,
          player.losePoints
        );

        date = moment(item.date).format("YYYY-MM-DD");
        tier = TierUtils.getTier(winRate);

        if (date === tmpDate[tmpDate.length - 1]) {
          tmpRate[tmpRate.length - 1] = winRate;
          tmpTier[tmpTier.length - 1] = tier;
        } else {
          if (player.winPoints + player.losePoints > 10) {
            tmpRate.push(winRate);
            tmpDate.push(date);
            tmpTier.push(tier);
          }
        }
        gameList.unshift({
          id: id,
          kill: kill,
          death: death,
          opponents: opponents,
          date: item.date,
          points: points,
        });
      });

      setRateHistory({
        rate: tmpRate,
        date: tmpDate,
        tier: tmpTier,
      });
      setGameList(gameList);
      setIsLoading(false);
    }
  }, [id, userList, history]);

  return (
    <Wrapper>
      <Profile user={user}></Profile>
      <Row>
        <ChartContainer>
          <Content height="auto">
            <Box>
              <Title>승률 추이</Title>

              {(() => {
                if (isLoading) {
                  return (
                    <LoadingWrapper>
                      <Loading></Loading>
                    </LoadingWrapper>
                  );
                } else {
                  if (rateHistory.date.length === 0) {
                    return <EmptyResult>10 게임 이상 진행 시 집계</EmptyResult>;
                  } else {
                    return (
                      <>
                        <LineChart
                          labels={rateHistory.date}
                          data={rateHistory.rate.map((item) => item * 100)}
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
                              <Text key={key}>
                                {FilterUtils.formatPercent(item)}
                              </Text>
                            ))}
                          </TextBox>
                        </TextBoxWrapper>
                      </>
                    );
                  }
                }
              })()}
            </Box>
          </Content>
          <Content height="auto">
            <Box>
              <Title>총 전적</Title>
              {isLoading ? (
                <LoadingWrapper>
                  <Loading></Loading>
                </LoadingWrapper>
              ) : (
                <>
                  <DoughnutChart
                    width="200px"
                    height="200px"
                    margin="20px auto"
                    labels={["승리", "패배"]}
                    data={[user.winPoints, user.losePoints]}
                  ></DoughnutChart>
                  <Text textAlign="center">{`${
                    user.winPoints + user.losePoints
                  }전 ${user.winPoints}승 ${
                    user.losePoints
                  }패 (승률: ${FilterUtils.formatPercent(
                    user.winRate
                  )})`}</Text>
                </>
              )}
            </Box>
          </Content>
          <Content height="auto">
            <Box>
              <Title>딜량</Title>
              {isLoading ? (
                <LoadingWrapper>
                  <Loading></Loading>
                </LoadingWrapper>
              ) : (
                <DoughnutChart
                  width="200px"
                  height="200px"
                  margin="20px auto"
                  labels={[
                    `적에게 가한 피해량 (${user.totalDeal})`,
                    `적에게 받은 피해량 (${user.totalDamageReceived})`,
                  ]}
                  data={[user.totalDeal, user.totalDamageReceived]}
                ></DoughnutChart>
              )}
            </Box>
          </Content>
        </ChartContainer>

        <HistoryContainer>
          {gameList.length === 0 ? (
            <EmptyResult>전적이 존재하지 않습니다.</EmptyResult>
          ) : (
            gameList.map((data, key) => (
              <Content key={key} height="auto">
                <HistoryList {...data} userList={userList}></HistoryList>
              </Content>
            ))
          )}
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
  margin-top: 40px;
  & > div {
    flex: 1;
  }
`;
const TextBox = styled.div``;
const Text = styled.p`
  font: var(--body14);
  text-align: ${(props) => props.textAlign};
  line-height: 24px;
`;
const SubText = styled.p`
  font: var(--body14);
  color: var(--sub);
  line-height: 24px;
`;
const LoadingWrapper = styled.div`
  padding: 80px 0px;
`;
const EmptyResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: var(--sub);
`;
