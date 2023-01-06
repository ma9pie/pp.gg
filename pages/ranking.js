import styled from "@emotion/styled";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import Statistics from "@/components/ranking/Statistics";
import CommonLayout from "@/layouts/CommonLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import useQuery from "@/hooks/useQuery";

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
      <Statistics title="피해량" statisticsList={statisticsList}></Statistics>
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
