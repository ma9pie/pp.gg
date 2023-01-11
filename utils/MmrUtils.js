const MmrUtils = () => {};

/**
 * 예상 승률 계산
 * @param {Number} P_op : 상대 점수
 * @param {Number} P_me : 내 점수
 * @returns {Number} W_e : 예상 승률
 */
MmrUtils.expectedWinRate = (P_op, P_me) => {
  const W_e = 1 / (10 ** ((P_op - P_me) / 400) + 1);
  return W_e;
};

/**
 * mmr 포인트 계산
 * @param {Number} rate : 승률
 * @param {String} type : 승패 여부
 * @returns {Number} point :  포인트
 */
MmrUtils.getMmrElo = (rate, type) => {
  const K = 24;
  switch (type) {
    case "WIN":
      return Number((K * (1 - rate)).toFixed(0));
    case "DRAW":
      return Number((K * (0.5 - rate)).toFixed(0));
    case "LOSE":
      return Number((K * (0 - rate)).toFixed(0));
    default:
      return 0;
  }
};

/**
 * mmr 포인트 계산
 * @param {Number} winnerRate : 승자 승률
 * @param {Number} loserRate : 패자 승률
 * @returns {Number} point :  포인트
 */
MmrUtils.getMmr = (winnerRate, loserRate) => {
  const K = 12;
  return Number((K * (1 + loserRate - winnerRate)).toFixed(0));
};

/**
 * 해당 유저들의 배치고사 여부
 * @param {Array} args : 유저 객체 배열
 * @returns {Boolean} 배치고사 여부
 */
MmrUtils.checkBatchTest = (...args) => {
  let result = true;
  args.map((user) => {
    result = result && Number(user.winPoints) + Number(user.losePoints) >= 10;
  });
  return result;
};

export default MmrUtils;
