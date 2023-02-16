import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import useQuery from "@/hooks/useQuery";

const Banner = dynamic(() => import("@/components/home/Banner"));
const HallFame = dynamic(() => import("@/components/home/HallFame"));
const MmrRanking = dynamic(() => import("@/components/home/MmrRanking"));
const SearchInput = dynamic(() => import("@/components/home/SearchInput"));

function Home() {
  const userListQueryKey = "/api/v1/userList";
  const historyQueryKey = "/api/v1/history";
  const bannerQueryKey = "/api/v1/banner";

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

  const banner = useQuery({
    placeholderData: [],
    queryKey: bannerQueryKey,
    queryFn: () => AxiosUtils.get(bannerQueryKey).then((res) => res.data),
  }).data;

  return (
    <Wrapper>
      {/* 배너 */}
      <BannerWrapper>
        <Banner list={banner}></Banner>
      </BannerWrapper>

      {/* 검색창 */}
      <SearchInput userList={userList}></SearchInput>

      {/* MMR 랭킹 */}
      <ContentWrapper>
        <MmrRanking userList={userList}></MmrRanking>
      </ContentWrapper>

      {/* 명예의 전당 */}
      <ContentWrapper>
        <HallFame userList={userList} historyLength={history.length}></HallFame>
      </ContentWrapper>
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
  background-color: var(--homeBg);
`;
const ContentWrapper = styled.div`
  margin: 30px 0px;
`;
