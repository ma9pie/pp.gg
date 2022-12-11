import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Axios from "@/api/index";
import useClickOutside from "@/hooks/useClickOutside";
import useDebounce from "@/hooks/useDebounce";

function Profile(props) {
  const [user, setUser] = useState({});
  const [tierData, setTierData] = useState({});

  useEffect(() => {
    if (props.id) {
      Axios.get("/api/v1/user", {
        params: { id: props.id },
      }).then((res) => {
        setUser(res.data);
      });
      Axios.get("/api/v1/tier", {
        params: { id: props.id },
      }).then((res) => {
        setTierData(res.data);
      });
    }
  }, [props.id]);

  return (
    <Wrapper>
      <Content>
        <Box>
          <ImageWrapper>
            {user.imgUrl && (
              <Image
                src={user.imgUrl}
                width={100}
                height={100}
                alt="profileImg"
              ></Image>
            )}
          </ImageWrapper>
        </Box>
        <Box>
          <NameText>{user.name}</NameText>
          <IdText>{user.id}</IdText>
        </Box>
        <Box>
          <TierWrapper>
            {tierData.imgUrl && (
              <Image
                src={tierData.imgUrl}
                width={100}
                height={100}
                alt="profileImg"
              ></Image>
            )}
          </TierWrapper>
          <TierText>{tierData.tier}</TierText>
        </Box>
      </Content>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  padding: 40px 60px;
  background-color: var(--bg) !important;
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
  gap: 24px;
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
const TierWrapper = styled.div`
  width: 100px;
  height: 100px;
`;
const TierText = styled.p`
  font: var(--body16);
  color: var(--sub);
  text-align: center;
`;
