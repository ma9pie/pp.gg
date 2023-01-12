const TierUtils = () => {};

TierUtils.getTier = (rate) => {
  // 아이언
  if (rate < 0.34) {
    return "Iron";
  }
  // 브론즈
  else if (rate < 0.36) {
    return "Bronze 4";
  } else if (rate < 0.38) {
    return "Bronze 3";
  } else if (rate < 0.4) {
    return "Bronze 2";
  } else if (rate < 0.42) {
    return "Bronze 1";
  }
  // 실버
  else if (rate < 0.44) {
    return "Silver 4";
  } else if (rate < 0.46) {
    return "Silver 3";
  } else if (rate < 0.48) {
    return "Silver 2";
  } else if (rate < 0.5) {
    return "Silver 1";
  }
  // 골드
  else if (rate < 0.52) {
    return "Gold 4";
  } else if (rate < 0.54) {
    return "Gold 3";
  } else if (rate < 0.56) {
    return "Gold 2";
  } else if (rate < 0.58) {
    return "Gold 1";
  }
  // 플래티넘
  else if (rate < 0.6) {
    return "Platinum 4";
  } else if (rate < 0.62) {
    return "Platinum 3";
  } else if (rate < 0.64) {
    return "Platinum 2";
  } else if (rate < 0.66) {
    return "Platinum 1";
  }
  // 다이아
  else if (rate < 0.68) {
    return "Diamond 4";
  } else if (rate < 0.7) {
    return "Diamond 3";
  } else if (rate < 0.72) {
    return "Diamond 2";
  } else if (rate < 0.74) {
    return "Diamond 1";
  }
  // 마스터
  else if (rate < 0.82) {
    return "Master";
  }
  // 그랜드 마스터
  else if (rate < 0.9) {
    return "Grandmaster";
  }
  // 챌린저
  else if (rate <= 1) {
    return "Challenger";
  }
};

export default TierUtils;
