import styled from "@emotion/styled";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import CommonLayout from "@/layouts/CommonLayout";
import TierUtils from "@/utils/TierUtils";

function Statistics() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    let tmpList = [];
    // user 조회 API 호출
    const tmpUserList = await Axios.get("/api/user", {
      params: { name: "" },
    }).then((res) => {
      return res.data;
    });

    // history 조회 API 호출
    const tmpHistory = await Axios.get("/api/history").then((res) => {
      return res.data;
    });

    // 통계
    tmpUserList.map((user) => {
      let totalDeal = 0; // 적에게 가한 피해량
      let winPoints = 0; // 승리 횟수
      let losePoints = 0; // 패배 횟수
      tmpHistory.map((history) => {
        if (history.winnerId === user.id) {
          totalDeal += history.winnerDamege;
          winPoints++;
        } else if (history.loserId === user.id) {
          totalDeal += history.loserDamege;
          losePoints++;
        }
      });
      tmpList.push({
        id: user.id,
        name: user.name,
        totalDeal: totalDeal,
        winPoints: winPoints,
        losePoints: losePoints,
        winRate: (winPoints / (winPoints + losePoints)) * 100,
      });
    });
    console.log(tmpList);
    setList(tmpList);
  };

  return (
    <Wrapper>
      <TableContainer>
        <Field>
          <Row>
            <Column>소환사명</Column>
            <Column>적에게 가한 피해량</Column>
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

const Wrapper = styled.div`
  width: 1080px;
  min-height: calc(100vh - 108px);
  margin: 0px auto;
  padding: 50px 0px;
`;
const TableContainer = styled.div`
  margin: auto;
  width: 800px;
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
  &:nth-of-type(n + 2):nth-of-type(-n + 5) {
    text-align: center;
  }
`;
