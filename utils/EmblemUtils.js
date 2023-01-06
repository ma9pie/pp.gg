const EmblemUtils = () => {};

EmblemUtils.getImgUrl = (winRate) => {
  if (winRate >= 90) {
    return "/images/emblems/challenger.png";
  } else if (winRate >= 82) {
    return "/images/emblems/grandmaster.png";
  } else if (winRate >= 74) {
    return "/images/emblems/master.png";
  } else if (winRate >= 66) {
    return "/images/emblems/diamond.png";
  } else if (winRate >= 58) {
    return "/images/emblems/platinum.png";
  } else if (winRate >= 50) {
    return "/images/emblems/gold.png";
  } else if (winRate >= 42) {
    return "/images/emblems/silver.png";
  } else if (winRate >= 34) {
    return "/images/emblems/bronze.png";
  } else {
    return "/images/emblems/iron.png";
  }
};

export default EmblemUtils;
