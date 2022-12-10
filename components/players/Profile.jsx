import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

function Profile(props) {
  return (
    <Wrapper>
      <Content>
        <ImageWrapper>
          {/* <Image
            src={ornnProfile}
            width={100}
            height={100}
            alt="profileImg"
          ></Image> */}
        </ImageWrapper>
      </Content>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  height: 228px;
  background-color: var(--bg);
  & * {
    background-color: inherit;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  width: 1080px;
  height: 100%;
  margin: 0px auto;
`;
const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
`;
