import EmblemUtils from "@/utils/EmblemUtils";
import MmrUtils from "@/utils/MmrUtils";
import TierUtils from "@/utils/TierUtils";

const StatisticsUtils = () => {};

StatisticsUtils.getWinRate = (winPoints, losePoints) => {
  if (winPoints === 0) return 0;
  else return winPoints / (winPoints + losePoints);
};

StatisticsUtils.calculate = (userList, history) => {
  const scoreboard = new Map();

  userList.map((item) => {
    scoreboard.set(item.id, {
      mmr: 2000,
      winRate: 0,
      winPoints: 0,
      losePoints: 0,
      totalDeal: 0,
      totalDamageReceived: 0,
    });
  });

  history.map((item) => {
    const winner = scoreboard.get(item.winnerId);
    const loser = scoreboard.get(item.loserId);

    ++winner.winPoints;
    ++loser.losePoints;

    winner.totalDeal += item.winnerScore;
    winner.totalDamageReceived += item.loserScore;
    winner.winRate = StatisticsUtils.getWinRate(
      winner.winPoints,
      winner.losePoints
    );

    loser.totalDeal += item.loserScore;
    loser.totalDamageReceived += item.winnerScore;
    loser.winRate = StatisticsUtils.getWinRate(
      loser.winPoints,
      loser.losePoints
    );

    const points = MmrUtils.getPoints(winner, loser);

    winner.mmr += points;
    loser.mmr -= points;
  });

  scoreboard.forEach((item, key) => {
    const user = userList.find((user) => user.id === key);
    if (user) {
      user.mmr = item.mmr;
      user.winRate = item.winRate;
      user.winPoints = item.winPoints;
      user.losePoints = item.losePoints;
      user.totalDeal = item.totalDeal;
      user.totalDamageReceived = item.totalDamageReceived;
      user.tier = TierUtils.getTier(item.winRate);
      user.emblemImgUrl = EmblemUtils.getImgUrl(item.winRate);
    }
  });
  return userList;
};

export default StatisticsUtils;
