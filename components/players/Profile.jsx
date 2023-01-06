import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Profile(props) {
  return (
    <Wrapper>
      <Content>
        <Box>
          <ImageWrapper>
            {props.user.imgUrl && (
              <Image
                src={props.user.imgUrl}
                width={100}
                height={100}
                alt="profileImg"
              ></Image>
            )}
          </ImageWrapper>
        </Box>
        <Box>
          <NameText>{props.user.name}</NameText>
          <IdText>{props.user.id}</IdText>
        </Box>
        <Box>
          <EmblemWrapper>
            {props.user.emblemImgUrl && (
              <Image
                src={props.user.emblemImgUrl}
                width={100}
                height={100}
                alt="profileImg"
              ></Image>
            )}
          </EmblemWrapper>
          <TierText>{props.user.tier}</TierText>
        </Box>
      </Content>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  padding: 40px 16px;
  background-color: var(--bg) !important;
  & * {
    background-color: inherit;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 1080px;
  height: 100%;
  margin: 0px auto;
  gap: 16px;
`;
const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
`;
const Box = styled.div``;
const NameText = styled.p`
  font: var(--headline24);
  margin-bottom: 8px;
`;
const IdText = styled.p`
  font: var(--body14);
  color: var(--sub);
`;
const EmblemWrapper = styled.div`
  width: 100px;
  height: 100px;
`;
const TierText = styled.p`
  font: var(--body16);
  color: var(--sub);
  text-align: center;
`;
