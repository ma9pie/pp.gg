const TierUtils = () => {};

TierUtils.getTier = (rate) => {
  // 아이언
  if (rate < 34) {
    return "Iron";
  }
  // 브론즈
  else if (rate < 36) {
    return "Bronze 4";
  } else if (rate < 38) {
    return "Bronze 3";
  } else if (rate < 40) {
    return "Bronze 2";
  } else if (rate < 42) {
    return "Bronze 1";
  }
  // 실버
  else if (rate < 44) {
    return "Silver 4";
  } else if (rate < 46) {
    return "Silver 3";
  } else if (rate < 48) {
    return "Silver 2";
  } else if (rate < 50) {
    return "Silver 1";
  }
  // 골드
  else if (rate < 52) {
    return "Gold 4";
  } else if (rate < 54) {
    return "Gold 3";
  } else if (rate < 56) {
    return "Gold 2";
  } else if (rate < 58) {
    return "Gold 1";
  }
  // 플래티넘
  else if (rate < 60) {
    return "Platinum 4";
  } else if (rate < 62) {
    return "Platinum 3";
  } else if (rate < 64) {
    return "Platinum 2";
  } else if (rate < 66) {
    return "Platinum 1";
  }
  // 다이아
  else if (rate < 68) {
    return "Diamond 4";
  } else if (rate < 70) {
    return "Diamond 3";
  } else if (rate < 72) {
    return "Diamond 2";
  } else if (rate < 74) {
    return "Diamond 1";
  }
  // 마스터
  else if (rate < 82) {
    return "Master";
  }
  // 그랜드 마스터
  else if (rate < 90) {
    return "Grandmaster";
  }
  // 챌린저
  else if (rate <= 100) {
    return "Challenger";
  }
};

export default TierUtils;
