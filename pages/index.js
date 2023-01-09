import styled from "@emotion/styled";
import React from "react";
import Banner from "@/components/home/Banner";
import HallFame from "@/components/home/HallFame";
import MobileBanner from "@/components/home/MobileBanner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import useQuery from "@/hooks/useQuery";

function Home() {
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

  return (
    <Wrapper>
      <BannerWrapper>
        <Banner></Banner>
        <MobileBanner></MobileBanner>
      </BannerWrapper>
      <SearchInput userList={userList}></SearchInput>
      <HallFameWrapper>
        <HallFame userList={userList}></HallFame>
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
