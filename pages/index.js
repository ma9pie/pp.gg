import { themeState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Axios from "axios";
import React, { useEffect } from "react";
import Banner from "@/components/home/Banner";
import MobileBanner from "@/components/home/MobileBanner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";

function Home() {
  return (
    <Wrapper>
      <BannerWrapper>
        <Banner></Banner>
        <MobileBanner></MobileBanner>
      </BannerWrapper>
      <SearchInput></SearchInput>
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
  padding: 56px 0px;
  background-color: var(--homeBg);
`;
