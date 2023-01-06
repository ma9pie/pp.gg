import styled from "@emotion/styled";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import Statistics from "@/components/ranking/Statistics";
import CommonLayout from "@/layouts/CommonLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import Axios from "@/api/index";

function Ranking(props) {
  console.log(props);
  const [statisticsList, setStatisticsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.userList && props.history) {
      let tmpList = [];

      props.userList.map((user) => {
        let totalDeal = 0; // 적에게 가한 피해량
        let totalDamageReceived = 0; // 적에게 받은 피해량
        let winPoints = 0; // 승리 횟수
        let losePoints = 0; // 패배 횟수
        let winRate = 0;
        props.history.map((item) => {
          if (item.winnerId === user.id) {
            totalDeal += item.winnerScore;
            totalDamageReceived += item.loserScore;
            winPoints++;
          } else if (item.loserId === user.id) {
            totalDeal += item.loserScore;
            totalDamageReceived += item.winnerScore;
            losePoints++;
          }
        });
        if (winPoints === 0) {
          winRate = 0;
        } else {
          winRate = (winPoints / (winPoints + losePoints)) * 100;
        }
        tmpList.push({
          ...user,
          totalDeal: totalDeal,
          totalDamageReceived: totalDamageReceived,
          winPoints: winPoints,
          losePoints: losePoints,
          winRate: winRate,
        });
      });
      tmpList.sort((a, b) => {
        if (a.winRate === b.winRate) {
          if (a.totalDeal === b.totalDeal) {
            // 2. 생성일 오름차순
            return moment(a.createdAt).unix() - moment(b.createdAt).unix();
          } else {
            // 2. 딜량 내림차순
            return b.totalDeal - a.totalDeal;
          }
        } else {
          // 1. 승률 내림차순
          return b.winRate - a.winRate;
        }
      });
      setStatisticsList(tmpList);
      setIsLoading(false);
    }
  }, [props.userList, props.history]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading></Loading>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Statistics title="피해량" statisticsList={statisticsList}></Statistics>
    </Wrapper>
  );
}

export default Ranking;

Ranking.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

// export async function getServerSideProps(context) {
//   try {
//     let userList = await axios
//       .get("http://localhost:3000/api/v1/allUser", {
//         params: {},
//       })
//       .then((res) => res.data);

//     await Promise.all(
//       userList.map((user) =>
//         axios
//           .get("http://localhost:3000/api/v1/tier", {
//             params: { id: user.id },
//           })
//           .then((res) => {
//             user.tier = res.data.tier;
//           })
//       )
//     );

//     const history = await axios
//       .get("http://localhost:3000/api/v1/history", {
//         params: {},
//       })
//       .then((res) => res.data);

//     return { props: { userList: userList, history: history } };
//   } catch (error) {
//     console.log(error);
//     return { props: { message: "server error" } };
//   }
//   // try {
//   //   let userList = await AxiosUtils.get("/api/v1/allUser", {
//   //     params: {},
//   //   }).then((res) => res.data);

//   //   await Promise.all(
//   //     userList.map((user) =>
//   //       Axios.get("/api/v1/tier", {
//   //         params: { id: user.id },
//   //       }).then((res) => {
//   //         user.tier = res.data.tier;
//   //       })
//   //     )
//   //   );

//   //   const history = await AxiosUtils.get("/api/v1/history", {
//   //     params: {},
//   //   }).then((res) => res.data);

//   //   return { props: { userList: userList, history: history } };
//   // } catch (error) {
//   //   console.log(error);
//   //   return { props: { history: [] } };
//   // }
// }

const Wrapper = styled.div``;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
