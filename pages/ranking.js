import styled from "@emotion/styled";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/CommonLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import useQuery from "@/hooks/useQuery";

const Statistics = dynamic(() => import("@/components/ranking/Statistics"));

function Ranking() {
  const [statisticsList, setStatisticsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userListQueryKey = "/api/v1/userList";

  const userList = useQuery({
    placeholderData: [],
    queryKey: userListQueryKey,
    queryFn: () => AxiosUtils.get(userListQueryKey).then((res) => res.data),
  }).data;

  useEffect(() => {
    const tmpList = userList.sort((a, b) => {
      // 1. mmr 내림차순
      if (a.mmr !== b.mmr) {
        return b.mmr - a.mmr;
      }
      // 2. 승률 내림차순
      if (a.winRate !== b.winRate) {
        return b.winRate - a.winRate;
      }
      // 3. 딜량 내림차순
      if (a.totalDeal !== b.totalDeal) {
        return b.totalDeal - a.totalDeal;
      }

      // 4. 생성일 오름차순
      return moment(a.createdAt).unix() - moment(b.createdAt).unix();
    });
    setStatisticsList(tmpList);
    setIsLoading(userList.length === 0);
  }, [userList]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading></Loading>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Statistics title="랭킹" statisticsList={statisticsList}></Statistics>
    </Wrapper>
  );
}

export default Ranking;

Ranking.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
