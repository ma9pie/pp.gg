import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

function Menu() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default Menu;

const Wrapper = styled.div`
  position: absolute;
  top: 42px;
  right: -24px;
  width: 150px;
  z-index: 2;
  background-color: var(--bg);
`;
const MenuContainer = styled.nav`
  border: 1px solid var(--blue700);
`;
const LinkBox = styled.div`
  padding: 8px 24px;
  background-color: var(--brandColor);
  cursor: pointer;
`;
const LinkText = styled.p`
  font: var(--body16);
  color: white;
  text-align: center;
`;
