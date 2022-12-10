import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommonLayout from "@/layouts/CommonLayout";
import bronze from "@/images/emblems/bronze.png";
import challenger from "@/images/emblems/challenger.png";
import diamond from "@/images/emblems/diamond.png";
import gold from "@/images/emblems/gold.png";
import grandmaster from "@/images/emblems/grandmaster.png";
import iron from "@/images/emblems/iron.png";
import master from "@/images/emblems/master.png";
import platinum from "@/images/emblems/platinum.png";
import silver from "@/images/emblems/silver.png";

const emblemSize = 200;
const tierList = [
  {
    img: iron,
    name: "아이언",
    rate: 0,
  },
  {
    img: bronze,
    name: "브론즈",
    rate: 34,
  },
  {
    img: silver,
    name: "실버",
    rate: 42,
  },
  {
    img: gold,
    name: "골드",
    rate: 50,
  },
  {
    img: platinum,
    name: "플래티넘",
    rate: 58,
  },
  {
    img: diamond,
    name: "다이아",
    rate: 66,
  },
  {
    img: master,
    name: "마스터",
    rate: 74,
  },
  {
    img: grandmaster,
    name: "그랜드 마스터",
    rate: 82,
  },
  {
    img: challenger,
    name: "챌린저",
    rate: 90,
  },
];

function Tiers() {
  return (
    <Wrapper>
      <Grid>
        {tierList.map((item, key) => (
          <ImageBox key={key}>
            <Image
              src={item.img}
              width={emblemSize}
              height={emblemSize}
              alt="emblem"
            ></Image>
            <Text>{item.name}</Text>
            <SubText>승률 {item.rate}% 이상</SubText>
          </ImageBox>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Tiers;

Tiers.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div`
  width: 1080px;
  min-height: calc(100vh - 108px);
  margin: 0px auto;
  padding: 50px 0px;
`;
const Grid = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 200px);
  padding: 0px 100px;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 100px;
`;
const Text = styled.div`
  font: var(--headline18);
`;
const SubText = styled.div`
  font: var(--body14);
  color: var(--sub);
`;
