import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import CommonLayout from "@/layouts/CommonLayout";
import TierUtils from "@/utils/TierUtils";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

function Statistics() {
  const [list, setList] = useState([]);

  const userListqueryKey = "/api/v1/user";
  const userList = useQuery({
    queryKey: userListqueryKey,
    queryFn: () =>
      Axios.get(userListqueryKey, {
        params: {},
      }).then((res) => res.data),
  });
  const historyqueryKey = "/api/v1/history";
  const history = useQuery({
    queryKey: historyqueryKey,
    queryFn: () =>
      Axios.get(historyqueryKey, {
        params: {},
      }).then((res) => res.data),
  });

  useEffect(() => {
    if (userList.data && history.data) {
      let tmpList = [];

      userList.data.map((user) => {
        let totalDeal = 0; // 적에게 가한 피해량
        let totalDamageReceived = 0; // 적에게 받은 피해량
        let winPoints = 0; // 승리 횟수
        let losePoints = 0; // 패배 횟수
        history.data.map((history) => {
          if (history.winnerId === user.id) {
            totalDeal += history.winnerScore;
            totalDamageReceived += history.loserScore;
            winPoints++;
          } else if (history.loserId === user.id) {
            totalDeal += history.loserScore;
            totalDamageReceived += history.winnerScore;
            losePoints++;
          }
        });
        tmpList.push({
          id: user.id,
          name: user.name,
          totalDeal: totalDeal,
          totalDamageReceived: totalDamageReceived,
          winPoints: winPoints,
          losePoints: losePoints,
          winRate: (winPoints / (winPoints + losePoints)) * 100,
        });
      });
      setList(tmpList);
    }
  }, [userList.data, history.data]);

  return (
    <Wrapper>
      <TableContainer>
        <Field>
          <Row>
            <Column>소환사명</Column>
            <Column>적에게 가한 피해량</Column>
            <Column>적에게 받은 피해량</Column>
            <Column>승리 횟수</Column>
            <Column>패배 횟수</Column>
            <Column>승률</Column>
            <Column>티어</Column>
          </Row>
        </Field>
        <Table>
          {list.map((item, key) => (
            <Row key={key}>
              <Column>{item.name}</Column>
              <Column>{item.totalDeal}</Column>
              <Column>{item.totalDamageReceived}</Column>
              <Column>{item.winPoints}</Column>
              <Column>{item.losePoints}</Column>
              <Column>{item.winRate.toFixed(2)}%</Column>
              <Column>{TierUtils.getTier(item.winRate)}</Column>
            </Row>
          ))}
        </Table>
      </TableContainer>
    </Wrapper>
  );
}

export default Statistics;

Statistics.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
const TableContainer = styled.div`
  margin: auto;
  width: 1000px;
`;
const Field = styled.div``;
const Table = styled.div``;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font: var(--body16);
  &:nth-of-type(n + 2):nth-of-type(-n + 7) {
    text-align: center;
  }
`;
