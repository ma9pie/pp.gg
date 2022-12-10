import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import ExtraSmallButton from "@/components/common/Buttons/ExtraSmallButton";
import Theme from "@/components/common/Theme";

function Header(props) {
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
        <Link href="/statistics" passHref>
          <a>
            <LinkBox>
              <LinkText>통계</LinkText>
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
      </MenuContainer>

      <ButtonWrapper>
        <ExtraSmallButton>
          <Link href="/login" passHref>
            <a>로그인 </a>
          </Link>
        </ExtraSmallButton>
        <Theme></Theme>
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
  padding: 0px 24px;
  border-bottom: ${(props) => props.borderBottom};
  background-color: var(--brandColor);
  & * {
    background-color: inherit;
  }
`;
const LogoWrapper = styled.div`
  cursor: pointer;
`;
const LogoText = styled.p`
  color: white;
  font-size: 32px;
  font-weight: 900;
`;
const MenuContainer = styled.nav`
  display: flex;
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
  gap: 16px;
`;
