import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import AxiosUtils from "@/utils/AxiosUtils";
import TierUtils from "@/utils/TierUtils";
import Axios from "@/api/index";

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n);
  });
}

const abc = async () => {
  const winHistory = await History.find({ winnerId: query.id }).lean();
  const loseHistory = await History.find({ loserId: query.id }).lean();

  let winPoints = winHistory.length;
  let losePoints = loseHistory.length;
  let winRate =
    winPoints === 0 ? 0 : (winPoints / (winPoints + losePoints)) * 100;

  const emblem = await Emblem.find({}).where("rate").lte(winRate).lean();

  res.status(200).json({
    tier: TierUtils.getTier(winRate),
    imgUrl: emblem.at(-1).imgUrl,
  });
};

function Test(props) {
  console.log(props);

  useEffect(() => {
    const { history, userList, emblem } = props;

    const scoreboard = new Map();

    userList.map((item) => {
      scoreboard.set(item.id, {
        winPoints: 0,
        losePoints: 0,
      });
    });
    console.log(scoreboard);

    history.map((item) => {
      const winner = scoreboard.get(item.winnerId);
      const loser = scoreboard.get(item.loserId);
      ++winner.winPoints;
      ++loser.losePoints;
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

        user.winRate = winRate;
        user.tier = TierUtils.getTier(winRate);
      }
    });

    Axios.get("/api/v1/userList").then((res) => {
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    if (props.error) {
      console.log(JSON.parse(props.error));
    }
  }, [props]);
  return (
    <Wrapper>
      {/* {url && <Image src={userList[0].imgUrl} alt="profile" width={30} height={30}></Image>} */}
    </Wrapper>
  );
}

export default Test;

export async function getServerSideProps(context) {
  try {
    let props = {};
    await AxiosUtils.get("/api/v1/allUser", {
      params: {},
    }).then(async (res) => {
      props.userList = res.data;
    });
    await AxiosUtils.get("api/v1/history").then((res) => {
      props.history = res.data;
      return res.data;
    });
    await AxiosUtils.get("api/v1/emblem").then((res) => {
      props.emblem = res.data;
      return res.data;
    });

    return { props: props };
  } catch (error) {
    console.log(error);
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div``;
