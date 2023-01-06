import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Banner from "@/components/home/Banner";
import HallFame from "@/components/home/HallFame";
import MobileBanner from "@/components/home/MobileBanner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function Home(props) {
  console.log(props);
  const historyQueryKey = "/api/v1/history";
  const emblemQueryKey = "/api/v1/emblem";

  useQuery({
    queryKey: historyQueryKey,
    queryFn: () => {
      return props.history;
    },
  });
  useQuery({
    queryKey: emblemQueryKey,
    queryFn: () => {
      return props.emblem;
    },
  });
  // useQuery({
  //   queryKey: historyQueryKey,
  //   queryFn: () =>
  //     Axios.get(historyQueryKey, {
  //       params: {},
  //     }).then((res) => res.data),
  // });
  // useQuery({
  //   queryKey: emblemQueryKey,
  //   queryFn: () =>
  //     Axios.get(emblemQueryKey, {
  //       params: {},
  //     }).then((res) => res.data),
  // });

  return (
    <Wrapper>
      <BannerWrapper>
        <Banner></Banner>
        <MobileBanner></MobileBanner>
      </BannerWrapper>
      <SearchInput></SearchInput>
      <HallFameWrapper>
        <HallFame></HallFame>
      </HallFameWrapper>
    </Wrapper>
  );
}

export default Home;

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export async function getServerSideProps(context) {
  try {
    // let userList = await AxiosUtils.get("/api/v1/allUser", {
    //   params: {},
    // }).then((res) => res.data);

    // await Promise.all(
    //   userList.map((user) =>
    //     AxiosUtils.get("/api/v1/tier", {
    //       params: { id: user.id },
    //     }).then((res) => {
    //       user.tier = res.data.tier;
    //     })
    //   )
    // );
    let props = {};

    await AxiosUtils.get("/api/v1/history", {
      params: {},
    }).then((res) => {
      props.history = res.data;
    });
    await AxiosUtils.get("/api/v1/emblem", {
      params: {},
    }).then((res) => {
      props.emblem = res.data;
    });

    return { props: props };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--homeBg);
`;

const BannerWrapper = styled.div`
  max-width: 1080px;
  background-color: var(--homeBg);
`;
const HallFameWrapper = styled.div`
  margin: 30px 0px;
`;
