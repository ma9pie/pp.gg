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
            <Title>PP.GG 오픈</Title>
            <Description>최고의 플레이어가 되보세요.</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue300)">
          <BannerContent>
            <Title>업데이트</Title>
            <Description>
              API 캐싱 및 속도 개선, 승률 추이 그래프 추가
            </Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue700)">
          <BannerContent>
            <Title>파파존스 1+1 이벤트</Title>
            <Description>매주 금요일은 파파존스</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper>
          <Comment top="70%" left="10%">
            보여줄게 MAGIC
          </Comment>
          <ImageAdjustment top="-10%">
            <Image src={shacoBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <Comment top="12%" left="73%">
            중요한건
          </Comment>
          <Comment top="27%" left="75%">
            꺾이지 않는 마음
          </Comment>
          <ImageAdjustment top="-20%">
            <Image src={ornnBanner} alt="bannerImage"></Image>
          </ImageAdjustment>
        </BannerWrapper>

        <BannerWrapper>
          <Comment top="20%" left="2%">
            네트만 넘기면 이기던데?
          </Comment>
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
