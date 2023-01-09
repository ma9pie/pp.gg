import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";
import TierUtils from "@/utils/TierUtils";
import Axios from "@/api/index";

function Test(props) {
  return (
    <Wrapper>
      {/* {url && <Image src={userList[0].imgUrl} alt="profile" width={30} height={30}></Image>} */}
    </Wrapper>
  );
}

export default Test;

// export async function getServerSideProps(context) {
//   try {
//     let props = {};
//     await SsrAxiosUtils.get("/api/v1/userList").then((res) => {
//       props.userList = res.data;
//     });
//     await SsrAxiosUtils.get("api/v1/history").then((res) => {
//       props.history = res.data;
//       return res.data;
//     });
//     await SsrAxiosUtils.get("api/v1/emblem").then((res) => {
//       props.emblem = res.data;
//       return res.data;
//     });

//     return { props: props };
//   } catch (error) {
//     console.log(error);
//     return { props: { error: JSON.stringify(error) } };
//   }
// }

const Wrapper = styled.div``;
