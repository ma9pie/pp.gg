import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Carousel from "@/components/common/Carousel";
import heimerdingerBanner from "@/images/banners/heimerdingerBanner.jpg";
import ornnBanner from "@/images/banners/ornnBanner.jpg";
import shacoBanner from "@/images/banners/shacoBanner.jpg";

function Banner() {
  return (
    <Wrapper>
      <Carousel
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <BannerWrapper backgroundColor="var(--blue600)">
          <BannerContent>
            <Title>๐2023 PPGG๐</Title>
            <Description>HAPPY NEW YEAR!๐ฐ</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue300)">
          <BannerContent>
            <Title>์๋ฐ์ดํธ</Title>
            <Description>
              API ์บ์ฑ ๋ฐ ์๋ ๊ฐ์ , ์น๋ฅ  ์ถ์ด ๊ทธ๋ํ ์ถ๊ฐ
            </Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue700)">
          <BannerContent>
            <Title>ํํ์กด์ค 1+1 ์ด๋ฒคํธ</Title>
            <Description>๋งค์ฃผ ๊ธ์์ผ์ ํํ์กด์ค</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-10%">
            <Image src={shacoBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-20%">
            <Image src={ornnBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-50%">
            <Image src={heimerdingerBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>
      </Carousel>
    </Wrapper>
  );
}

export default Banner;

const Wrapper = styled.div`
  width: 100%;
  margin: 56px 0px;
  @media (max-width: 1080px) {
    display: none;
  }
`;
const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  & * {
    background-color: inherit;
  }
`;
const BannerContent = styled.div`
  background-color: inherit;
`;
const Title = styled.p`
  color: white;
  font-size: 96px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 24px;
`;
const Description = styled.p`
  color: white;
  font-size: 32px;
  font-weight: 900;
  text-align: center;
`;
const ImageAdjustment = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: 0%;
`;
const Comment = styled.p`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  color: white;
  font-size: 32px;
  font-weight: 700;
  z-index: 1;
  background-color: transparent;
`;
