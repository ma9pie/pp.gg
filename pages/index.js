import { themeState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Banner from "@/components/home/Banner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";
import useQuery from "@/hooks/useQuery";

function Home() {
  const [theme, setTheme] = useRecoilState(themeState);

  const getBackgroundColor = () => {
    return theme === "Dark" ? "var(--bg)" : "var(--brandColor)";
  };

  return (
    <Wrapper backgroundColor={getBackgroundColor()}>
      <BannerWrapper backgroundColor={getBackgroundColor()}>
        <Banner></Banner>
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
  background-color: var(--brandColor);
  background-color: ${(props) => props.backgroundColor};
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1080px;
  padding: 56px 0px;
  background-color: var(--brandColor);
  background-color: ${(props) => props.backgroundColor};
`;
