import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "@/components/common/Carousel";

function Banner({ list }) {
  console.log(list);

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
        {list.map((item, key) => {
          if (item.link) {
            return (
              <Link key={key} href={item.link} passHref>
                <a>
                  <BannerWrapper backgroundColor={item.backgroundColor}>
                    <BannerContent>
                      <Title>{item.title}</Title>
                      <Description>{item.description}</Description>
                    </BannerContent>
                  </BannerWrapper>
                </a>
              </Link>
            );
          } else {
            return (
              <BannerWrapper key={key} backgroundColor={item.backgroundColor}>
                <BannerContent>
                  <Title>{item.title}</Title>
                  <Description>{item.description}</Description>
                </BannerContent>
              </BannerWrapper>
            );
          }
        })}
        {/* <BannerWrapper backgroundColor="var(--blue600)">
          <BannerContent>
            <Title>📢업데이트 v1.0.2</Title>
            <Description>MMR 랭킹 시스템 도입</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue300)">
          <BannerContent>
            <Title>🎉2023 PPGG🎉</Title>
            <Description>HAPPY NEW YEAR!🐰</Description>
          </BannerContent>
        </BannerWrapper>

        <BannerWrapper backgroundColor="var(--blue700)">
          <BannerContent>
            <Title>📋미 회원가입 시</Title>
            <Description>기본 비밀번호 q1q1q1q1</Description>
          </BannerContent>
        </BannerWrapper> */}
      </Carousel>
    </Wrapper>
  );
}

export default Banner;

const Wrapper = styled.div`
  height: 150px;
  border-radius: 5px;
  margin: 32px 0px;
  overflow: hidden;
`;
const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
