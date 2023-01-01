import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Carousel from "@/components/common/Carousel";
import heimerdingerBanner from "@/images/banners/heimerdingerBanner.jpg";
import ornnBanner from "@/images/banners/ornnBanner.jpg";
import shacoBanner from "@/images/banners/shacoBanner.jpg";

function MobileBanner() {
  return (
    <Wrapper>
      <Carousel
        width="80vw"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <BannerWrapper backgroundColor="var(--blue600)">
          <BannerContent>
            <Title>🎉2023 PPGG🎉</Title>
            <Description>HAPPY NEW YEAR!🐰</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue300)">
          <BannerContent>
            <Title>업데이트</Title>
            <Description>회원가입 기능 추가, 프로필 이미지 변경</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue700)">
          <BannerContent>
            <Title>파파존스 1+1 이벤트</Title>
            <Description>매주 금요일은 파파존스</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-10%">
            <Image src={shacoBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-5%">
            <Image src={ornnBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <ImageAdjustment top="-10%">
            <Image src={heimerdingerBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>
      </Carousel>
    </Wrapper>
  );
}

export default MobileBanner;

const Wrapper = styled.div`
  height: 150px;
  border-radius: 10px;
  margin: 32px 0px;
  overflow: hidden;
  @media (min-width: 1080px) {
    display: none;
  }
`;
const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
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
  font-size: 32px;
  font-weight: 900;
  color: white;
  text-align: center;
  margin-bottom: 16px;
`;
const Description = styled.p`
  font-size: 14px;
  font-weight: 900;
  color: white;
  text-align: center;
`;
const ImageAdjustment = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: 0%;
`;
const Comment = styled.p`
  font: var(--body14);
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  color: white;
  z-index: 1;
  background-color: transparent;
  &* {
    background-color: inherit;
  }
`;
const Test = styled.div`
  width: 200px;
  height: 60px;
  background-color: ${(props) => props.backgroundColor};
`;
