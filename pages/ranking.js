import styled from "@emotion/styled";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonLayout from "@/layouts/CommonLayout";

function Ranking() {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {}, []);

  return <Wrapper>Ranking</Wrapper>;
}

export default Ranking;

Ranking.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
