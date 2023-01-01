import { signupState } from "@/recoil/atom";
import styled from "@emotion/styled";
import champions from "lol-champions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LargeButton from "@/components/common/Buttons/LargeButton";
import Loading from "@/components/common/Loading";
import ModalUtils from "@/utils/ModalUtils";
import Axios from "@/api/index";

function ProfileImg(props) {
  const [signup, setSignup] = useRecoilState(signupState);

  const [championList, setChampionList] = useState([]);
  const [selected, setSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 챔피언 리스트 데이터
  useEffect(() => {
    setChampionList(
      champions.sort((a, b) => {
        return a.id.localeCompare(b.id, "en");
      })
    );
  }, []);

  const selectChampion = (champion) => {
    setSelected(champion);
    setSignup({
      ...signup,
      imgUrl: champion.icon,
    });
  };

  // 가입하기
  const register = () => {
    const req = { ...signup };
    setIsLoading(true);
    Axios.post("/api/v1/user", req).then((res) => {
      setIsLoading(false);
      if (res.data.message) {
        ModalUtils.openAlert({ message: res.data.message });
      } else {
        props.setProcess(3);
      }
    });
  };

  return (
    <Wrapper>
      <Title>프로필 이미지를 선택해주세요.</Title>

      <SelectedImageWrapper>
        {selected.icon && (
          <>
            <Image
              src={selected.icon}
              alt={selected.id}
              width={100}
              height={100}
            ></Image>
            <SubText>{selected.id}</SubText>
          </>
        )}
      </SelectedImageWrapper>

      <ImageContainer>
        {championList.map((item) => (
          <ImageWrapper key={item.id} onClick={() => selectChampion(item)}>
            <Image src={item.icon} alt={item.id} width={48} height={48}></Image>
          </ImageWrapper>
        ))}
      </ImageContainer>

      <LargeButton
        disabled={selected.icon && !isLoading ? false : true}
        onClick={register}
      >
        {isLoading ? <Loading color="white"></Loading> : "가입하기"}
      </LargeButton>
    </Wrapper>
  );
}

export default ProfileImg;
const Wrapper = styled.div``;
const Title = styled.p`
  font: var(--headline24);
`;
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 48px);
  gap: 4px;
  margin-bottom: 80px;
`;
const ImageWrapper = styled.div`
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const SelectedImageWrapper = styled.div`
  width: 100px;
  height: 120px;
  margin: 32px auto;
`;
const SubText = styled.p`
  font: var(--body14);
  color: var(--sub);
  text-align: center;
`;
