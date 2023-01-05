import { memberState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import ExtraSmallButton from "@/components/common/Buttons/ExtraSmallButton";
import Theme from "@/components/common/Theme";
import Menu from "@/components/layout/Menu";
import ModalUtils from "@/utils/ModalUtils";
import useClickOutside from "@/hooks/useClickOutside";
import ProfileSvg from "@/svg/ProfileSvg";
import ViewMoreSvg from "@/svg/ViewMoreSvg";

function Header(props) {
  const menuRef = useRef(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [member, setMember] = useRecoilState(memberState);
  const logout = useResetRecoilState(memberState);

  useEffect(() => {
    if (member.id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [member]);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router]);

  useClickOutside(menuRef, () => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    }
  });

  return (
    <Wrapper {...props}>
      <LogoWrapper>
        <Link href="/">
          <a>
            <LogoText>PP.GG</LogoText>
          </a>
        </Link>
      </LogoWrapper>

      <MenuContainer>
        <Link href="/">
          <a>
            <LinkBox>
              <LinkText>홈</LinkText>
            </LinkBox>
          </a>
        </Link>
        <Link href="/ranking" passHref>
          <a>
            <LinkBox>
              <LinkText>랭킹</LinkText>
            </LinkBox>
          </a>
        </Link>
        <Link href="/tiers" passHref>
          <a>
            <LinkBox>
              <LinkText>티어표</LinkText>
            </LinkBox>
          </a>
        </Link>
        <Link href="/history" passHref>
          <a>
            <LinkBox>
              <LinkText>전적 기록</LinkText>
            </LinkBox>
          </a>
        </Link>
      </MenuContainer>
      <ButtonWrapper>
        {isLogin ? (
          <>
            <ExtraSmallButton
              onClick={() => {
                ModalUtils.openConfirm({
                  message: "로그아웃 하시겠습니까?",
                  onRequestConfirm: () => {
                    logout();
                  },
                });
              }}
            >
              로그아웃
            </ExtraSmallButton>
            <ProfileSvg
              color="white"
              onClick={() => {
                ModalUtils.openAlert({
                  message: `마이페이지 개발 예정\n 아이디: ${member.id}\n 닉네임: ${member.name}`,
                });
              }}
            ></ProfileSvg>
          </>
        ) : (
          <Link href="/login" passHref>
            <a>
              <ExtraSmallButton>로그인</ExtraSmallButton>
            </a>
          </Link>
        )}
        <Theme></Theme>
        <ViewMoreSvgWrapper ref={menuRef}>
          <ViewMoreSvg
            color="white"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          ></ViewMoreSvg>
          {isOpenMenu && <Menu></Menu>}
        </ViewMoreSvgWrapper>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Header;

Header.defaultProps = {
  borderBottom: "2px solid var(--sectionLine)",
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  border-bottom: ${(props) => props.borderBottom};
  background-color: var(--brandColor);
  & * {
    background-color: inherit;
  }
`;
const LogoWrapper = styled.div`
  /* margin-right: 24px; */
  cursor: pointer;
`;
const LogoText = styled.p`
  color: white;
  font-size: 28px;
  font-weight: 900;
`;
const MenuContainer = styled.nav`
  display: flex;
  @media (max-width: 1080px) {
    display: none;
  }
`;
const LinkBox = styled.div`
  padding: 8px 24px;
  cursor: pointer;
`;
const LinkText = styled.p`
  font: var(--body16);
  color: white;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 200px;
`;
const ViewMoreSvgWrapper = styled.div`
  position: relative;
  @media (min-width: 1080px) {
    display: none;
  }
`;
