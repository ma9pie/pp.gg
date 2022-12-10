import styled from "@emotion/styled";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "@/layouts/CommonLayout";

function Custom404() {
  return (
    <Wrapper>
      <TextBox>
        <Text>404</Text>
        <SubText>Page Not Found</SubText>
      </TextBox>
    </Wrapper>
  );
}

export default Custom404;

Custom404.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div`
  padding-top: 100px;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  color: var(--brandColor);
  font-size: 320px;
  font-weight: 900;
`;
const SubText = styled.p`
  color: var(--brandColor);
  font-size: 80px;
  font-weight: 900;
`;
