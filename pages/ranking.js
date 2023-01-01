import styled from "@emotion/styled";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Statistics from "@/components/ranking/Statistics";
import CommonLayout from "@/layouts/CommonLayout";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function Ranking() {
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
      tmpList.sort((a, b) => {
        if (a.winRate === b.winRate) {
          if (a.totalDeal === b.totalDeal) {
            // 2. 생성일 오름차순
            return moment(a.createdAt).unix() - moment(b.createdAt).unix();
          } else {
            // 2. 딜량 내림차순
            return b.totalDeal - a.totalDeal;
          }
        } else {
          // 1. 승률 내림차순
          return b.winRate - a.winRate;
        }
      });
      setStatisticsList(tmpList);
    }
  }, [userList.data, history.data]);

  return (
    <Wrapper>
      <Statistics title="피해량" statisticsList={statisticsList}></Statistics>
    </Wrapper>
  );
}

export default Ranking;

Ranking.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
