import styled from "@emotion/styled";
import Axios from "axios";
import React, { useEffect } from "react";
import Banner from "@/components/home/Banner";
import HallFame from "@/components/home/HallFame";
import MobileBanner from "@/components/home/MobileBanner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";
import useQuery from "@/hooks/useQuery";

function Home() {
  const historyQueryKey = "/api/v1/history";
  const emblemQueryKey = "/api/v1/emblem";

  useQuery({
    queryKey: historyQueryKey,
    queryFn: () =>
      Axios.get(historyQueryKey, {
        params: {},
      }).then((res) => res.data),
  });
  useQuery({
    queryKey: emblemQueryKey,
    queryFn: () =>
      Axios.get(emblemQueryKey, {
        params: {},
      }).then((res) => res.data),
  });

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
