import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import AxiosUtils from "@/utils/AxiosUtils";
import EmblemUtils from "@/utils/EmblemUtils";
import MmrUtils from "@/utils/MmrUtils";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";
import StatisticsUtils from "@/utils/StatisticsUtils";
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

    const tmpHistory = history.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    StatisticsUtils.calculate(userList, tmpHistory);
  }, [userList, history]);

  useEffect(() => {
    // console.log(MmrUtils.expectedWinRate(2400, 2000));
    // console.log(MmrUtils.expectedWinRate(2000, 2400));
  }, []);

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
