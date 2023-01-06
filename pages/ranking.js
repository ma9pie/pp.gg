import styled from "@emotion/styled";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import Statistics from "@/components/ranking/Statistics";
import CommonLayout from "@/layouts/CommonLayout";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";

function Ranking(props) {
  const [statisticsList, setStatisticsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tmpList = props.userList.sort((a, b) => {
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
    setIsLoading(false);
  }, [props]);

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

export async function getServerSideProps(context) {
  try {
    let props = {};
    await SsrAxiosUtils.get("/api/v1/userList").then((res) => {
      props.userList = res.data;
    });
    await SsrAxiosUtils.get("/api/v1/history", {
      params: {},
    }).then((res) => {
      props.history = res.data;
    });
    return { props: props };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div``;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
