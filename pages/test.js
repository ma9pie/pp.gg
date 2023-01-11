import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import AxiosUtils from "@/utils/AxiosUtils";
import EmblemUtils from "@/utils/EmblemUtils";
import MmrUtils from "@/utils/MmrUtils";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";
import TierUtils from "@/utils/TierUtils";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function Test(props) {
  const userListQueryKey = "/api/v1/userList";
  const historyQueryKey = "/api/v1/history";
  const emblemQueryKey = "/api/v1/emblem";

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

  const emblem = useQuery({
    placeholderData: [],
    queryKey: emblemQueryKey,
    queryFn: () => AxiosUtils.get(emblemQueryKey).then((res) => res.data),
  }).data;

  useEffect(() => {
    if (history.length === 0 || userList.length === 0) return;

    const scoreboard = new Map();

    userList.map((item) => {
      scoreboard.set(item.id, {
        mmr: 2000,
        winRate: 0,
        winPoints: 0,
        losePoints: 0,
        totalDeal: 0,
        totalDamageReceived: 0,
      });
    });

    history.map((item) => {
      const winner = scoreboard.get(item.winnerId);
      const loser = scoreboard.get(item.loserId);

      ++winner.winPoints;
      winner.totalDeal += item.winnerScore;
      winner.totalDamageReceived += item.loserScore;
      winner.winRate =
        winner.winPoints === 0
          ? 0
          : winner.winPoints / (winner.winPoints + winner.losePoints);

      ++loser.losePoints;
      loser.totalDeal += item.loserScore;
      loser.totalDamageReceived += item.winnerScore;
      loser.winRate =
        loser.winPoints === 0
          ? 0
          : loser.winPoints / (loser.winPoints + loser.losePoints);

      if (MmrUtils.checkBatchTest(winner, loser)) {
        winner.mmr += MmrUtils.getMmr(winner.winRate, "WIN");

        loser.mmr += MmrUtils.getMmr(loser.winRate, "LOSE");
      }

      if (item.winnerId === "ymkin") {
        console.log("승", winner.mmr, loser.mmr, item.loserId);
      }
      if (item.loserId === "ymkin") {
        console.log("패", winner.mmr, loser.mmr, item.winnerId);
      }

      scoreboard.set(item.winnerId, winner);
      scoreboard.set(item.loserId, loser);
    });

    scoreboard.forEach((item, key) => {
      const user = userList.find((user) => user.id === key);
      if (user) {
        const winRate =
          item.winPoints === 0
            ? 0
            : (item.winPoints / (item.winPoints + item.losePoints)) * 100;

        user.mmr = item.mmr;
        user.winRate = item.winRate * 100;
        user.winPoints = item.winPoints;
        user.losePoints = item.losePoints;
        user.totalDeal = item.totalDeal;
        user.totalDamageReceived = item.totalDamageReceived;
        user.tier = TierUtils.getTier(winRate);
        user.emblemImgUrl = EmblemUtils.getImgUrl(winRate);
      }
    });
  }, [userList, history]);

  return (
    <Wrapper>
      {/* {url && <Image src={userList[0].imgUrl} alt="profile" width={30} height={30}></Image>} */}
    </Wrapper>
  );
}

export default Test;

// export async function getServerSideProps(context) {
// const delay = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };
// await delay(3000);
// return { props: { isLoading: true } };
// try {
//   let props = {};
//   await SsrAxiosUtils.get("/api/v1/userList").then((res) => {
//     props.userList = res.data;
//   });
//   await SsrAxiosUtils.get("api/v1/history").then((res) => {
//     props.history = res.data;
//     return res.data;
//   });
//   await SsrAxiosUtils.get("api/v1/emblem").then((res) => {
//     props.emblem = res.data;
//     return res.data;
//   });
//   return { props: props };
// } catch (error) {
//   console.log(error);
//   return { props: { error: JSON.stringify(error) } };
// }
// }

const Wrapper = styled.div``;
