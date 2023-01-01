import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";

function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [tierData, setTierData] = useState({});

  useEffect(() => {
    if (props.id) {
      Axios.get("/api/v1/user", {
        params: { id: props.id },
      }).then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          ModalUtils.openAlert({
            message: "존재하지 않는 사용자입니다.",
            onAfterClose: () => router.push("/"),
          });
        }
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
const TierWrapper = styled.div`
  width: 100px;
  height: 100px;
`;
const TierText = styled.p`
  font: var(--body16);
  color: var(--sub);
  text-align: center;
`;
