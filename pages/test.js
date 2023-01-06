import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import AxiosUtils from "@/utils/AxiosUtils";
import Axios from "@/api/index";

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n);
  });
}

function Test(props) {
  console.log(props);

  useEffect(() => {
    if (props.error) {
      console.log(JSON.parse(props.error));
    }
  }, [props]);
  return (
    <Wrapper>
      {/* {url && <Image src={userList[0].imgUrl} alt="profile" width={30} height={30}></Image>} */}
    </Wrapper>
  );
}

export default Test;

export async function getServerSideProps(context) {
  try {
    const props = {};
    await AxiosUtils.get("api/v1/history").then((res) => {
      props.test = res.data;
      return res.data;
    });

    return { props: props };
  } catch (error) {
    console.log(error);
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div``;
